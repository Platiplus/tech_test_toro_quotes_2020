import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreComponent } from './explore.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SimpleModalService } from 'ngx-simple-modal';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ ExploreComponent ],
      providers: [
        SimpleModalService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
