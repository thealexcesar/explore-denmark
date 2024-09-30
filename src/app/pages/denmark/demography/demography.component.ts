import { Component } from '@angular/core';
import {NavLinksComponent} from "@ui/nav-links/nav-links.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'denmark-demography',
  standalone: true,
  imports: [
    NavLinksComponent,
    RouterOutlet
  ],
  templateUrl: './demography.component.html',
  styles: ``
})
export class DemographyComponent {

}
