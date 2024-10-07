import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ThemeService} from "@services/theme.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ScrollService} from "@services/scroll.service";
import {MenuService} from "@services/menu.service";
import {User} from "@models/users/user";
import {UserService} from "@services/user.service";
import {AuthService} from "@services/auth.service";
import {UserStateService} from "@services/user-state.service";

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
  currentUser: User | null = null;

  constructor(
    public auth: AuthService,
    public menu: MenuService,
    private router: Router,
    private scroll: ScrollService,
    private theme: ThemeService,
    private userState: UserStateService
  ) {}

  ngOnInit(): void {
    this.setInitialTheme();

    this.userState.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['']).then(r => console.log(r));
  }

  toggleMenu(): void {
    this.menu.toggleMenu();
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.navbar') && this.menu._isMenuOpen) {
      this.menu.closeMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showBorder = window.scrollY > 0;
  }

  scrollToTop() {
    setTimeout(() => this.scroll.scrollToTop(), 300);
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
