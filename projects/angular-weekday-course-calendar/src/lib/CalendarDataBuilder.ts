export enum Wochentage {
  Montag = 0,
  Dienstag = 1,
  Mittwoch = 2,
  Donnerstag = 3,
  Freitag = 4,
  Samstag = 5,
  Sonntag = 6,
}

export enum GridItemType {
  Header,
  Time,
  Spacer,
  Course,
}

const timediff: number = 5;

class GridItem {
  content: string | null;
  type: GridItemType;
  displayContent: boolean;


  constructor(content: string | null, type: GridItemType, displayContent: boolean) {
    this.content = content;
    this.type = type;
    this.displayContent = displayContent;
  }
}

export class CourseGridItem extends GridItem {
  day: Wochentage;
  standort: string;
  gridrowStart: number;
  gridrowEnd: number;
  course: Course;


  constructor(day: Wochentage, standort: string, gridrowStart: number, gridrowEnd: number, course: Course) {
    super(null, GridItemType.Course, false);
    this.day = day;
    this.standort = standort;
    this.gridrowStart = gridrowStart;
    this.gridrowEnd = gridrowEnd;
    this.course = course;
  }
}

class CalendarGrid {
  header: GridItem[] = [];
  times: GridItem[] = [];
  spacers: GridItem[][] = [];
  courses: GridItem[][] = [];
}

export class CoursesContainer {
  Locations: CourseLocation[];

  constructor(locations: CourseLocation[]) {
    this.Locations = locations;
  }
}

export class CourseLocation {
  Standort: string;
  Preis: number;
  PreisWeste: number;
  Eintritt: string;
  Courses: Course[];


  constructor(Standort: string, Preis: number, PreisWeste: number, Courses: Course[], Eintritt: string) {
    this.Standort = Standort;
    this.Preis = Preis;
    this.PreisWeste = PreisWeste;
    this.Courses = Courses;
    this.Eintritt = Eintritt;
  }
}

export class Course {
  Name: string;
  Day: string;
  HourFrom: number;
  MinuteFrom: number;
  Duration: number;
  FreeSpace: boolean;


  constructor(Name: string, Day: string, HourFrom: number, MinuteFrom: number, Length: number, FreeSpace: boolean) {
    this.Name = Name;
    this.Day = Day;
    this.HourFrom = HourFrom;
    this.MinuteFrom = MinuteFrom;
    this.Duration = Length;
    this.FreeSpace = FreeSpace;
  }
}

export interface GridRowPosition {
  rowStart: number,
  rowEnd: number
}


export class CalendarDataBuilder {
  private calendarGrid: CalendarGrid = new CalendarGrid();
  weekdays: string[] = [];
  startHour: number;
  endHour: number;
  disableSunday: boolean;


  constructor(startHour: number, endHour: number, disableSunday: boolean = true) {
    this.startHour = startHour;
    this.endHour = endHour;
    this.disableSunday = disableSunday;

    this.fillWeekdays();
    this.appendHeader();
    this.appendTimeRows();
    this.appendSpacers();

  }

  public getCalendarGrid() {
    return this.calendarGrid;
  }

  public getColAndRowForCourse(courseStartHour: number, courseStartMinute: number, duration: number): GridRowPosition {
    if (courseStartHour > this.endHour || courseStartHour < this.startHour || duration % 5 !== 0 || duration == 0) {
      console.error("ERROR with course: start: " + courseStartHour + ':' + courseStartMinute + " duration: " + duration);
      return {rowStart: 0, rowEnd: 0};
    }

    let hoursSinceCalendarTimeStart = (courseStartHour - this.startHour);

    let rowStart = hoursSinceCalendarTimeStart * 60/timediff;
    rowStart += (courseStartMinute/timediff) + 1;


    let rowEnd = rowStart + (duration/timediff);
    console.log(rowStart + '/' + rowEnd)

    return {rowStart: rowStart, rowEnd: rowEnd}
  }

  private fillWeekdays() {
    for (let enumMember in Wochentage) {
      let isValueProperty = Number(enumMember) >= 0
      if (isValueProperty) {
        this.weekdays.push(Wochentage[enumMember]);
      }
    }

    if(this.disableSunday){
      this.weekdays.pop();
    }
  }


  private appendHeader() {
    let header: GridItem[] = [...this.weekdays.map((weekday) => new GridItem(weekday, GridItemType.Header, true))];
    this.calendarGrid.header = header;
  }

  private appendTimeRows() {
    let startHour = this.startHour;
    let startMinute = 0;

    let endHour = this.endHour;

    let times: GridItem[] = [];
    while (startHour < endHour) {
      let timeContent = startHour + ':' + (startMinute < 10 ? '0' + startMinute : startMinute);

      if (startMinute % 60 == 0) {
        times.push(new GridItem(timeContent, GridItemType.Time, true));
      }

      let newMinute = startMinute + timediff;
      if (newMinute >= 60) {
        startMinute = 0;
        startHour++;
      } else {
        startMinute = newMinute;
      }
    }
    this.calendarGrid.times = times;
  }

  private appendSpacers() {
    this.calendarGrid.header.forEach((header) => {
      let row: GridItem[] = [];
      this.calendarGrid.times.forEach(() => {
        row.push(new GridItem(null, GridItemType.Time, false));
      });
      this.calendarGrid.spacers.push(row);
    });
  }


}
