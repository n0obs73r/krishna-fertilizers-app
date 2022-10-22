import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizersViewComponent } from './fertilizers-view.component';

describe('FertilizersViewComponent', () => {
  let component: FertilizersViewComponent;
  let fixture: ComponentFixture<FertilizersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertilizersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertilizersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
