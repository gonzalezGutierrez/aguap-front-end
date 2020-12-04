import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieDetailsComponent } from './supplie-details.component';

describe('SupplieDetailsComponent', () => {
  let component: SupplieDetailsComponent;
  let fixture: ComponentFixture<SupplieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
