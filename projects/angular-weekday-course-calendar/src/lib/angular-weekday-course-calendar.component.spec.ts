import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularWeekdayCourseCalendarComponent } from './angular-weekday-course-calendar.component';

describe('AngularWeekdayCourseCalendarComponent', () => {
  let component: AngularWeekdayCourseCalendarComponent;
  let fixture: ComponentFixture<AngularWeekdayCourseCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularWeekdayCourseCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularWeekdayCourseCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
