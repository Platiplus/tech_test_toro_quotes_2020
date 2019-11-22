import { NgModule } from '@angular/core';

import { ExploreComponent } from './explore.component';
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
    ExploreComponent,
  ],
})
export class ExploreModule { }