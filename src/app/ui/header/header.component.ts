import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {AuthService} from "@services/auth.service";
import {UserModel} from "@models/user/user-model";
import {NavLinksComponent} from "@ui/nav-links/nav-links.component";

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
  currentUser: UserModel | string = '';
  isScrolled: boolean = false;
  menuOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService

  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.isLoggedIn ? this.authService.getCurrentUser() : '';
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
    console.log('open?', this.menuOpen)
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
