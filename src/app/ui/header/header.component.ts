import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

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
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn().then();
  }

  async isLoggedIn() {
    // this.isLoggedInStatus = await this.authService.isLoggedIn();
  }

  logout() {
    // this.authService.logout().then();
  }
}
