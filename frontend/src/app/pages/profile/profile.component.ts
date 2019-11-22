import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AccountModalComponent } from '../../components/modal/accountModal.component';
import { StockModalComponent } from '../../components/modal/stockModal.component';
import { SimpleModalService } from "ngx-simple-modal";
import { AccountService } from 'src/app/services/account.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'plat-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public referenceOptions = {}
  public stockOptions = [];
  public ioConnection: any;
  public username: string = ''
  public userInfo: object = {
    username: '',
    _id: '',
    stocks: [{}]
  }
  public accountInfo: object = {
    balance: 0
  }

  constructor(private quoteService: QuoteService, private profileService: ProfileService, private simpleModalService: SimpleModalService, private accountService: AccountService) { }

  private initIoConnection(): void {
    this.quoteService.initSocket();

    this.ioConnection = this.quoteService.onMessage()
      .subscribe((message: any) => {
        let quotation = JSON.parse(message.utf8Data);
        let quoteObject = Object.keys(quotation);
        if(this.referenceOptions[quoteObject[0]] !== undefined){
          this.userInfo.stocks.find((stock) => {
            if(stock.name === quoteObject[0]){
              stock.value = quotation[quoteObject[0]]
              console.log(stock)
            }
          })
        }
      });
    }

  ngOnInit() {
    this.initIoConnection();

    this.username = localStorage.getItem('username')
    this.profileService.getUser().subscribe((data) => {
      this.userInfo = data.user;
      this.userInfo.stocks.map((stock) => this.referenceOptions[stock.name] = true)
    })
    this.profileService.getAccount().subscribe((data) => {
      this.accountInfo = data.account;
    })
  }

  showMovement(action, balance) {
    let disposable = this.simpleModalService.addModal(AccountModalComponent, {
          action,
          balance
        })
        .subscribe((isConfirmed)=> {
            if(isConfirmed) {
              this.accountService.moveMoney(isConfirmed).subscribe((data) => {
                this.profileService.getAccount().subscribe((data) => {
                  this.accountInfo = data.account;
                })
              })
            }
        });
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
}

showSell(name, value, balance, action) {
  let disposable = this.simpleModalService.addModal(StockModalComponent, {
      name,
      value,
      balance,
      action
      })
      .subscribe((isConfirmed)=> {
        if(isConfirmed) {
          this.quoteService.moveQuote('SELL', isConfirmed).subscribe((data) => {
            this.profileService.getUser().subscribe((data) => {
              this.userInfo = data.user;
              this.userInfo.stocks.map((stock) => this.referenceOptions[stock.name] = true)
            })
            this.profileService.getAccount().subscribe((data) => {
              this.accountInfo = data.account;
            })
          })
        }
    });
  setTimeout(()=>{
      disposable.unsubscribe();
  },10000);
}

}
