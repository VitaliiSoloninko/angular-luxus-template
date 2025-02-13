import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-luxus-template';
}
