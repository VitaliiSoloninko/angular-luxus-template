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
import { Meetings } from '../meetings.interface';

@Component({
  selector: 'app-weeks-calender',
  imports: [CommonModule],
  templateUrl: './weeks-calender.component.html',
  styleUrl: './weeks-calender.component.scss',
})
export class WeeksCalenderComponent {
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

  daysOfWeek: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('week')
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
    console.log(this.daysOfWeek());
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

  goToPreviousWeek(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ weeks: 1 })
    );
  }
  goToNextWeek(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ weeks: 1 })
    );
  }
  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }
}
