import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeService} from "@services/theme.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'denmark-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    FaIconComponent,

    NgIf
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  themeIcon = 'sun';
  isLoggedIn: boolean = false;
  showBorder: boolean = false;

  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.setInitialTheme();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showBorder = window.scrollY > 0;
  }

  scrollToTop(): void {
    if (window.scrollY > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateThemeIcon(this.themeService.getCurrentTheme());
  }

  updateThemeIcon(theme: string = 'light'): void {
    this.themeIcon = theme === 'dark' ? 'moon' : 'sun';
  }

  setInitialTheme(): void {
    this.updateThemeIcon(this.themeService.getCurrentTheme());
  }

  logout(): void {
    console.log('saiu');
  }

  scrollToSection(sectionId: string): void {
    if (this.router.url === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      this.router.navigate(['/']).then(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }
}
