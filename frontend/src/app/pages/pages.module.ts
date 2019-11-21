import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ExploreModule } from './explore/explore.module';
import { ProfileModule } from './profile/profile.module';
import { NotFoundModule } from './not-found/not-found.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    ExploreModule,
    ProfileModule,
    NotFoundModule,
    LoginModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}