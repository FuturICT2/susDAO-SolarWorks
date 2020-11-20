import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccorpComponent } from './eleccorp.component';

describe('EleccorpComponent', () => {
  let component: EleccorpComponent;
  let fixture: ComponentFixture<EleccorpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleccorpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleccorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
