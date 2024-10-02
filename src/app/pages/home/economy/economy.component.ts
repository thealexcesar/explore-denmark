import { Component } from '@angular/core';
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
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
