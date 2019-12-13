import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessWinComponent } from './chess-win.component';

describe('ChessWinComponent', () => {
  let component: ChessWinComponent;
  let fixture: ComponentFixture<ChessWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
