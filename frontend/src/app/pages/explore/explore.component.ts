import { Component, OnInit } from '@angular/core';
import { StockModalComponent } from '../../components/modal/stockModal.component';
import { DetailsModalComponent } from '../../components/modal/detailsModal.component';
import { SimpleModalService } from "ngx-simple-modal";
import { QuoteService } from '../../services/quote.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'plat-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  constructor(private quoteService: QuoteService, private profileService: ProfileService, private simpleModalService:SimpleModalService, private router: Router) {}

  public referenceOptions = {}
  public stockOptions = [];
  public ioConnection: any;
  public accountInfo: object;
  
  private initIoConnection(): void {
    this.quoteService.initSocket();

    this.ioConnection = this.quoteService.onMessage()
      .subscribe((message: any) => {
        let quotation = JSON.parse(message.utf8Data);
        let quoteObject = Object.keys(quotation);
        if(this.referenceOptions[quoteObject[0]] === undefined){
          this.referenceOptions[quoteObject[0]] =  true;
          this.stockOptions.push({name: quoteObject[0], value: quotation[quoteObject[0]], timestamp: moment.unix(quotation.timestamp).format('YYYY-MM-DD HH:mm:ss'), min: quotation[quoteObject[0]], max: quotation[quoteObject[0]] })
        } else {
          this.stockOptions.find((stock) => {
            if(stock.name === quoteObject[0]){

              stock.value = quotation[quoteObject[0]] > 0 ? quotation[quoteObject[0]] : stock.value
              stock.timestamp = moment.unix(quotation.timestamp).format('YYYY-MM-DD HH:mm:ss')

              if (quotation[quoteObject[0]] < stock.min){
                stock.min = quotation[quoteObject[0]]
              }

              if(quotation[quoteObject[0]] > stock.max) {
                stock.max = quotation[quoteObject[0]]
              }
            }
          })
        }
      });
    }

  ngOnInit() {
    this.initIoConnection();
    this.profileService.getAccount().subscribe((data) => {
      this.accountInfo = data.account;
    })
  }

  showBuy(name, value, balance, action) {
    let disposable = this.simpleModalService.addModal(StockModalComponent, {
          name,
          value,
          balance,
          action
        })
        .subscribe((isConfirmed)=> {
            if(isConfirmed) {
              this.quoteService.moveQuote('BUY', isConfirmed).subscribe((data) => {
                this.router.navigate(['/pages/profile']);
              })
            }
        });
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
}

  showDetails(name, value, min, max) {
    let disposable = this.simpleModalService.addModal(DetailsModalComponent, {
      name,
      value,
      min,
      max
    })
    .subscribe((isConfirmed)=> {
        if(isConfirmed) {
          disposable.unsubscribe();
        }
    });
    
    setTimeout(()=>{
      disposable.unsubscribe();
    },10000);
  }
}
