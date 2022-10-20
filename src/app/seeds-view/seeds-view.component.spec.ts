import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsViewComponent } from './seeds-view.component';

describe('SeedsViewComponent', () => {
  let component: SeedsViewComponent;
  let fixture: ComponentFixture<SeedsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
