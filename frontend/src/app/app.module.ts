import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginModule } from './pages/login/login.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RegisterModule } from './pages/register/register.module';
import { SimpleModalModule } from 'ngx-simple-modal';
import { StockModalComponent } from './components/modal/stockModal.component';
import { FormsModule } from '@angular/forms';
import { DetailsModalComponent } from './components/modal/detailsModal.component';
import { AccountModalComponent } from './components/modal/accountModal.component';

@NgModule({
  declarations: [
    AppComponent,
    StockModalComponent,
    DetailsModalComponent,
    AccountModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    SimpleModalModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  entryComponents: [
    StockModalComponent,
    DetailsModalComponent,
    AccountModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
