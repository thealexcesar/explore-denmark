import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'denmark-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'explore-denmark';
}
