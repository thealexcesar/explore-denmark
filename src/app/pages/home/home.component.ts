import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
<<<<<<< HEAD:src/app/pages/home/home.component.ts
import {NavLinksComponent} from "@components/nav-links/nav-links.component";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {GeographyComponent} from "@pages/home/geography/geography.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {NavbarComponent} from "@components/navbar/navbar.component";
=======
import {NavLinksComponent} from "../../../components/nav-links/nav-links.component";
import {DemographyComponent} from "@pages/denmark/demography/demography.component";
import {EconomyComponent} from "@pages/denmark/economy/economy.component";
import {GeographyComponent} from "@pages/denmark/geography/geography.component";
import {HistoryComponent} from "@pages/denmark/history/history.component";
import {User} from "@models/user/user";
import {UserService} from "@services/user.service";
import {FormsModule} from "@angular/forms";
>>>>>>> feature/jwt-json-server:src/app/pages/denmark/home/home.component.ts

@Component({
  selector: 'denmark-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NavLinksComponent,
<<<<<<< HEAD:src/app/pages/home/home.component.ts
    NavbarComponent,
    DemographyComponent,
    HistoryComponent,
    EconomyComponent
=======
    FormsModule
>>>>>>> feature/jwt-json-server:src/app/pages/denmark/home/home.component.ts
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'explore-denmark';
  nameFilter: string = '';
  limit: number = 100;
  limitOptions: number[] = [100, 10, 15];
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
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.nameFilter, this.limit).subscribe(data => {
      this.users = data;
    });
  }

  onSearch(): void {
    this.getUsers();
  }

  onLimitChange(): void {
    this.getUsers();
  }
}
