import { Component } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";

export interface StockModel {
  name:string;
  value: number;
  balance: number;
  action: string;
}

@Component({
    selector: 'confirm',
    template: `
      <div class="plat-modal-content">
        <div class="plat-modal-header">
          <h3>{{name}}</h3>
        </div>
        <div class="plat-modal-body">
          <h4>Valor da cota: <b>R$ {{value | number: '1.1-2'}}</b></h4>
          <input placeholder="Quantidade" type="number" [(ngModel)]=quantity />
          <p class="total">Valor total: <span>R$ {{quantity * value | number:'1.1-2'}}</span></p>
          <p *ngIf="action=='BUY'">Quantos cotas gostaria de comprar?</p>
          <p *ngIf="action=='SELL'">Quantos cotas gostaria de vender?</p>
        </div>
        <div class="plat-modal-footer">
          <button class="confirmButton" type="button" (click)="confirm()">Confirmar</button>
          <a class="cancelButton" type="button" (click)="close()" >Cancelar</a>
        </div>
      </div>
    `,
    styleUrls: ['./modal.component.scss']
})
export class StockModalComponent extends SimpleModalComponent<StockModel, object> implements StockModel {
  name: string;
  value: number;
  balance: number;
  quantity: number;
  calc: number;
  action: string;

  constructor() {
    super();
  }


  confirm() {
    this.result = { quantity: this.quantity, value: this.quantity * this.value, name: this.name};
    this.close();
  }
}