import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { Meetings } from './meetings.interface';

@Component({
  selector: 'app-calender',
  imports: [CommonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
})
export class CalenderComponent {
  meetings: InputSignal<Meetings> = input.required();
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
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
  DATE_MED = DateTime.DATE_MED;

  constructor() {
    console.log(this.daysOfMonth());
  }

  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();
    if (!activeDayISO) {
      return [];
    }
    return this.meetings()[activeDayISO] ?? [];
  });

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ months: 1 })
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ months: 1 })
    );
  }
  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }
}
