import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsUpdateComponent } from './ads-update.component';

describe('AdsUpdateComponent', () => {
  let component: AdsUpdateComponent;
  let fixture: ComponentFixture<AdsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
