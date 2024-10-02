import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {UserService} from "@services/user.service";
import {NavLinksComponent} from "../nav-links/nav-links.component";
import {User} from "@models/user/user";

@Component({
  selector: 'denmark-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive,
    MatButton,
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FaIconComponent,
    NavLinksComponent,
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  isScrolled: boolean = false;
  menuOpen: boolean = false;

  constructor(private router: Router, private user: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.user.isLoggedIn();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
