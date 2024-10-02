import { Component } from '@angular/core';
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'denmark-history',
  standalone: true,
  imports: [
    NavLinksComponent,
    RouterOutlet
  ],
  templateUrl: './history.component.html',
  styles: ``
})
export class HistoryComponent {

}
