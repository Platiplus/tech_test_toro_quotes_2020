import { NgModule } from '@angular/core';

import { ExploreComponent } from './explore.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  imports: [
    RouterModule,
    NavbarModule,
  ],
  declarations: [
    ExploreComponent,
  ],
})
export class ExploreModule { }