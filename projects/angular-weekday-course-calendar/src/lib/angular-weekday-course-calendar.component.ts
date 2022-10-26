import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {
  CalendarDataBuilder,
  CourseGridItem,
  CoursesContainer,
  GridItemType,
  GridRowPosition,
  Wochentage
} from './CalendarDataBuilder';

@Component({
  selector: 'angular-weekday-course-calendar',
  templateUrl: './angular-weekday-course-calendar.component.html',
  styleUrls: ['./angular-weekday-course-calendar.component.scss']
})
export class AngularWeekdayCourseCalendarComponent implements OnInit {

  elementHeight: any;

  @Input()
  emptyStart?: number;

  @Input()
  emptyEnd?: number;

  @Input()
  courseContainer?: CoursesContainer;

  @Input() courseTemplate?: TemplateRef<any>;

  Wochentage = Wochentage;

  GridItemType = GridItemType;

  calendarDataBuilder?: CalendarDataBuilder;
  coursesGridItems: CourseGridItem[] = [];
  fiveMinutesHeight: string = (40/12) + "px";

  disableSunday: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    let startAndEndHour = this.courseContainer ? this.getStartAndEndHour(this.courseContainer) : [this.emptyStart ?? 7,this.emptyEnd ?? 20];

    console.log(startAndEndHour)

    this.calendarDataBuilder = new CalendarDataBuilder(startAndEndHour[0], startAndEndHour[1], this.disableSunday);


    this.courseContainer?.Locations.forEach((location) => {
      location.Courses.forEach((course) => {
        let gridRowPosition: GridRowPosition =  this.calendarDataBuilder!.getColAndRowForCourse(course.HourFrom, course.MinuteFrom, course.Duration)
        // @ts-ignore
        this.coursesGridItems.push(new CourseGridItem(Wochentage[course.Day], location.Standort, gridRowPosition.rowStart, gridRowPosition.rowEnd, course));
      });
    });

  }


  getCoursesForWochentag(wochentag: Wochentage){
    return this.coursesGridItems.filter(course => course.day == wochentag);
  }

  private getStartAndEndHour(courseContainer: CoursesContainer) {
    let startHour = 24;
    let endHour = 0;

    courseContainer.Locations.forEach((location) => {
      location.Courses.forEach((course) => {
        startHour = Math.min(course.HourFrom, startHour);
        endHour = Math.max(course.HourFrom  + Math.round(course.Duration / 60), endHour);
      });
    });

    return [startHour, endHour];
  }
}
