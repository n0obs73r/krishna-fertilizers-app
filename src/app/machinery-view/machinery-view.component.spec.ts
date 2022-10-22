import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryViewComponent } from './machinery-view.component';

describe('MachineryViewComponent', () => {
  let component: MachineryViewComponent;
  let fixture: ComponentFixture<MachineryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
