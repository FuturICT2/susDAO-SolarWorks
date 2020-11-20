import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelownerComponent } from './panelowner.component';

describe('PanelownerComponent', () => {
  let component: PanelownerComponent;
  let fixture: ComponentFixture<PanelownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelownerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
