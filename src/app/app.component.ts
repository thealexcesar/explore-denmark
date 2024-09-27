import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'denmark-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'explore-denmark';
}
