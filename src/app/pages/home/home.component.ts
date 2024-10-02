import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {GeographyComponent} from "@pages/home/geography/geography.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {NavbarComponent} from "@components/navbar/navbar.component";

@Component({
  selector: 'denmark-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NavLinksComponent,
    NavbarComponent,
    DemographyComponent,
    HistoryComponent,
    EconomyComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'explore-denmark';

  linksScroll = [
    { path: 'intro', label: 'home' },
    { path: 'culture', label: 'culture' },
    { path: 'demography', label: 'demography' },
    { path: 'geography', label: 'geography' },
    { path: 'history', label: 'history' }
  ];

  linkPage = [
    { path: '/article', label: 'article' },
    { path: '/login', label: 'login' }
  ];
}
