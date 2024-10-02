import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'denmark-nav-links',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    NgClass
  ],
  templateUrl: './nav-links.component.html'
})
export class NavLinksComponent {
  isLoggedIn: any;
  menuOpen: any;



  logout() {

  }
}
