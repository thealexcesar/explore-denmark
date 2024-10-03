import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeService} from "@services/theme.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ScrollService} from "@services/scroll.service";

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
  switchTheme!: string;

  constructor(
    private theme: ThemeService,
    private router: Router,
    private scroll: ScrollService,
  ) {}

  ngOnInit(): void {
    this.setInitialTheme();
  }

  logout(): void {
    console.log('saiu');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showBorder = window.scrollY > 0;
  }

  scrollToTop() {
    this.scroll.scrollToTop();
  }

  scrollToSection(sectionId: string = ''): void {
    this.router.url === '' ? this.scroll.scrollToSection(sectionId)
      : this.router.navigate(['']).then(() => this.scroll.scrollToSection(sectionId));
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
    this.updateTheme(this.theme.getCurrentTheme());
  }

  private setInitialTheme(): void {
    this.updateTheme(this.theme.getCurrentTheme());
  }

  private updateTheme(theme: string = 'light'): void {
    const switchTo = 'Trocar tema para';
    this.themeIcon = theme === 'dark' ? 'moon' : 'sun';
    this.switchTheme = theme === 'dark' ? `${switchTo} claro` : `${switchTo} claro`
  }
}
