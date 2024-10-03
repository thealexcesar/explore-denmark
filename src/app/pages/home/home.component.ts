import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {NavbarComponent} from "@components/navbar/navbar.component";
import {User} from "@models/user/user";
import {UserService} from "@services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'denmark-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
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
    {path: 'intro', label: 'home'},
    {path: 'culture', label: 'culture'},
    {path: 'demography', label: 'demography'},
    {path: 'geography', label: 'geography'},
    {path: 'history', label: 'history'}
  ];

  linkPage = [
    {path: '/article', label: 'article'},
    {path: '/login', label: 'login'}
  ];
  users: User[] = [];

  constructor(private userService: UserService, private toast: ToastrService) {
  }

  // ngOnInit(): void {
  //   this.getUsers();
  // }

  // getUsers(): void {
  //   this.userService.getUsers(this.nameFilter, this.limit).subscribe(data => {
  //     this.users = data;
  //   });
  // }

  // onSearch(): void {
  //   this.getUsers();
  // }
  //
  // onLimitChange(): void {
  //   this.getUsers();
  // }
}
