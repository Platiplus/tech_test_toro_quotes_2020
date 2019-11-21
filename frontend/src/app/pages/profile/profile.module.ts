import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  imports: [
    RouterModule,
    NavbarModule,
  ],
  declarations: [
    ProfileComponent,
  ],
})
export class ProfileModule { }