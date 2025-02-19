import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { WeeksCalenderComponent } from './calender/weeks-calender/weeks-calender.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalenderComponent, WeeksCalenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-luxus-template';

  meetings = {
    '2025-02-13': ['Meeting 1', 'Meeting 2'],
    '2025-02-14': ['Meeting 3', 'Meeting 4'],
    '2025-02-15': ['Meeting 5', 'Meeting 6'],
    '2025-02-16': ['Meeting 7', 'Meeting 8'],
    '2025-02-17': ['Meeting 9', 'Meeting 10'],
    '2025-02-18': ['Meeting 11', 'Meeting 12'],
  };
}
