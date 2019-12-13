import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoFieldComponent } from './bingo-field.component';

describe('BingoFieldComponent', () => {
  let component: BingoFieldComponent;
  let fixture: ComponentFixture<BingoFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingoFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
