import { NgModule } from '@angular/core';
import { AngularWeekdayCourseCalendarComponent } from './angular-weekday-course-calendar.component';
import {NgForOf, NgTemplateOutlet} from "@angular/common";



@NgModule({
  declarations: [
    AngularWeekdayCourseCalendarComponent
  ],
  imports: [
    NgTemplateOutlet,
    NgForOf
  ],
  exports: [
    AngularWeekdayCourseCalendarComponent
  ]
})
export class AngularWeekdayCourseCalendarModule { }
