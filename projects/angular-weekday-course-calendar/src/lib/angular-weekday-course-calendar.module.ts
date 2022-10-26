import { NgModule } from '@angular/core';
import { AngularWeekdayCourseCalendarComponent } from './angular-weekday-course-calendar.component';
import {NgTemplateOutlet} from "@angular/common";



@NgModule({
  declarations: [
    AngularWeekdayCourseCalendarComponent
  ],
  imports: [
    NgTemplateOutlet
  ],
  exports: [
    AngularWeekdayCourseCalendarComponent
  ]
})
export class AngularWeekdayCourseCalendarModule { }
