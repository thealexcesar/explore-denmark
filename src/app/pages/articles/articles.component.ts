import { Component } from '@angular/core';
import {NavLinksComponent} from "../../components/nav-links/nav-links.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'denmark-articles',
  standalone: true,
  imports: [
    NavLinksComponent,
    RouterOutlet
  ],
  templateUrl: './articles.component.html',
  styles: ``
})
export class ArticlesComponent {

}
