import { Component } from '@angular/core';
<<<<<<< HEAD:src/app/pages/home/geography/geography.component.ts
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
=======
import {NavLinksComponent} from "../../../components/nav-links/nav-links.component";
>>>>>>> feature/jwt-json-server:src/app/pages/denmark/geography/geography.component.ts
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
