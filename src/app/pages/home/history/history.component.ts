import { Component } from '@angular/core';
<<<<<<< HEAD:src/app/pages/home/history/history.component.ts
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
=======
import {NavLinksComponent} from "../../../components/nav-links/nav-links.component";
>>>>>>> feature/jwt-json-server:src/app/pages/denmark/history/history.component.ts
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
