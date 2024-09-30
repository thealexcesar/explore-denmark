import { Component } from '@angular/core';
import {NavLinksComponent} from "@ui/nav-links/nav-links.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'denmark-geography',
  standalone: true,
  imports: [
    NavLinksComponent,
    RouterOutlet
  ],
  templateUrl: './geography.component.html',
  styles: ``
})
export class GeographyComponent {

}
