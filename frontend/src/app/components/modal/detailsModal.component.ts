import { Component } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";

export interface DetailsModel {
  name:string;
  value: number;
  min: number;
  max: number;
}

@Component({
    selector: 'confirm',
    template: `
      <div class="plat-modal-content">
        <div class="plat-modal-header">
          <h3>{{name}}</h3>
        </div>
        <div class="plat-modal-body">
          <p class="total">Valor atual: R$ {{value | number:'1.1-2'}}</p>
          <p class="total">Máxima do dia: R$ {{max | number:'1.1-2'}}</p>
          <p class="total">Mínima do dia: R$ {{min | number:'1.1-2'}}</p>
        </div>
        <div class="plat-modal-footer">
          <button class="confirmButton" type="button" (click)="confirm()">Fechar</button>
        </div>
      </div>
    `,
    styleUrls: ['./modal.component.scss']
})
export class DetailsModalComponent extends SimpleModalComponent<DetailsModel, boolean> implements DetailsModel {
  name: string;
  value: number;
  min: number;
  max: number;

  constructor() {
    super();
  }

  confirm() {
    this.result = true;
    this.close();
  }
}