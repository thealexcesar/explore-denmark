import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NavLinksComponent} from "@ui/nav-links/nav-links.component";
import {DemographyComponent} from "@pages/denmark/demography/demography.component";
import {EconomyComponent} from "@pages/denmark/economy/economy.component";
import {GeographyComponent} from "@pages/denmark/geography/geography.component";
import {HistoryComponent} from "@pages/denmark/history/history.component";

@Component({
  selector: 'denmark-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NavLinksComponent
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
