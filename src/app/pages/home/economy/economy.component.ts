import { Component } from '@angular/core';
<<<<<<< HEAD:src/app/pages/home/economy/economy.component.ts
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
=======
import {NavLinksComponent} from "../../../components/nav-links/nav-links.component";
>>>>>>> feature/jwt-json-server:src/app/pages/denmark/economy/economy.component.ts
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'denmark-economy',
  standalone: true,
  imports: [
    NavLinksComponent,
    RouterOutlet
  ],
  templateUrl: './economy.component.html',
  styles: ``
})
export class EconomyComponent {

}
