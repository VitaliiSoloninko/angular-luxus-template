import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calender',
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
})
export class CalenderComponent {
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('month'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    )
      .splitBy({ days: 1 })
      .map((day) => {
        if (day.start === null) {
          throw new Error('Wrong day');
        }
        return day.start;
      });
  });

  constructor() {
    console.log(this.daysOfMonth());
  }
}
