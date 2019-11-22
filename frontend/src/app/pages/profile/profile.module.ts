import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    NavbarModule,
    CommonModule,
  ],
  declarations: [
    ProfileComponent,
  ],
})
export class ProfileModule { }