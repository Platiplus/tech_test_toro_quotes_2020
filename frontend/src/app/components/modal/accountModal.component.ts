import { Component } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";

export interface AccountModel {
  action: string;
  balance: number;
}

@Component({
    selector: 'confirm',
    template: `
      <div class="plat-modal-content">
      <div class="plat-modal-header">
      <img src="../../assets/ic-money.svg"/>
        <h3 *ngIf="action === 'WITHDRAWAL'">Saque seu dinheiro</h3>
        <h3 *ngIf="action === 'DEPOSIT'">Deposite seu dinheiro</h3>
      </div>
        <div class="plat-modal-body">
        <h4 *ngIf="action === 'WITHDRAWAL'" >Valor disponível: <b>R$ {{balance | number: '1.1-2'}}</b></h4>
          <input class="movementInput" placeholder="Valor desejado" type="number" [(ngModel)]=value>
        </div>
        <div class="plat-modal-footer">
        <button class="confirmButton" type="button" (click)="confirm()">Confirmar</button>
        <a class="cancelButton" type="button" (click)="close()" >Cancelar</a>
        </div>
      </div>
    `,
    styleUrls: ['./modal.component.scss']
})
export class AccountModalComponent extends SimpleModalComponent<AccountModel, object> implements AccountModel {
  value: number;
  action: string;
  balance: number;

  constructor() {
    super();
  }

  confirm() {
    this.result = { action: this.action, value : this.value };
    this.close();
  }
}