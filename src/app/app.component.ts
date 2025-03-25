import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  template: `
    <div style="text-align:center; max-width:600px; margin:0 auto; padding:20px; font-family:Arial">
      <h1>Conversor de Moedas</h1>

      <!-- Div do valor para ser convertido -->
      <div style="display: flex; justify-content: space-between; margin: 15px 0; align-items: center;">
        <div style="flex: 1; display: flex; flex-direction: column; align-items: flex-start;">
          <label>Valor a converter: </label>
          <input type="number" [(ngModel)]="valorReal" min="0.01" step="0.01" (ngModelChange)="converter()" class="input-box">
        </div>

        <div style="align-self: center; margin: 0 15px;">
          <button (click)="inverterMoedas()" style="background:#01540f; color:white; border:none; padding:10px; border-radius:4px; cursor:pointer;">
            &#8596;
          </button>
        </div>

        <!-- Div do valor convertido -->
        <div style="flex: 1; display: flex; flex-direction: column; align-items: flex-start;">
          <label>Valor convertido:</label>
          <input type="text" [value]="resultado" readonly class="input-box">
        </div>
      </div>

      <!-- Lista de moedas -->
      <div style="margin:15px">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1; text-align: left;">
            <label>Converter de: </label>
            <select [(ngModel)]="moedaOrigem" (ngModelChange)="converter()">
              <option value="USD">Dólar - USD</option>
              <option value="EUR">Euro - EUR </option>
              <option value="GBP">Libra - GBP </option>
              <option value="BRL">Real - BRL </option>
            </select>
          </div>
          
          <div style="flex: 1; text-align: left;">
            <label>Para: </label>
            <select [(ngModel)]="moedaSelecionada" (ngModelChange)="converter()">
              <option value="USD">Dólar - USD</option>
              <option value="EUR">Euro - EUR </option>
              <option value="GBP">Libra - GBP </option>
              <option value="BRL">Real - BRL </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Mensagem de erro, dinheiro 0 ou menor que isso -->
      <div *ngIf="erro" style="color: red; margin-top: 10px;">
        <p>Por favor, insira um valor válido maior que zero.</p>
      </div>

    <router-outlet />
    </div>
  `,
  styles: [
    `
      .input-box {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        box-sizing: border-box;
      }

      h1 {
        background-color: #c1d9c2;
        padding: 10px;
        border-radius: 5px;
      }

      label {
        font-weight: bold;
      }
    `
  ]
})
export class AppComponent {
  title = 'conversor-simples';
  valorReal: number = 1;
  moedaOrigem: string = 'BRL';
  moedaSelecionada: string = 'USD';
  resultado?: number;
  erro: boolean = false;

  /* Valor das taxas de conversão */
  taxas = { 'USD': 5.80, 'EUR': 6.21, 'GBP': 7.38, 'BRL': 1 };

  converter() {
    if (this.valorReal <= 0) {
      this.erro = true;
      this.resultado = undefined;
      return;
    }

    this.erro = false;
    const taxaOrigem = this.taxas[this.moedaOrigem as keyof typeof this.taxas];
    const taxaDestino = this.taxas[this.moedaSelecionada as keyof typeof this.taxas];
    this.resultado = parseFloat(((this.valorReal / taxaOrigem) * taxaDestino).toFixed(2));
  }

  /* Botão de trocar os valores*/
  inverterMoedas() {
    const temp = this.moedaOrigem;
    this.moedaOrigem = this.moedaSelecionada;
    this.moedaSelecionada = temp;
    this.converter();
  }
}
