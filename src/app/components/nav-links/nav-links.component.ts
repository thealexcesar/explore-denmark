<<<<<<< HEAD
import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
=======
import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "@services/user.service";
>>>>>>> feature/jwt-json-server

@Component({
  selector: 'denmark-nav-links',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    NgClass
  ],
  templateUrl: './nav-links.component.html'
})
<<<<<<< HEAD
export class NavLinksComponent {
  isLoggedIn: any;
  menuOpen: any;



  logout() {

=======
export class NavLinksComponent implements OnInit {
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;

  constructor(private user: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.user.isLoggedIn();
    this.user.updateUserStatus();
  }

  logout(): void {
    this.user.logout();
    this.router.navigate(['/login']).then();
>>>>>>> feature/jwt-json-server
  }
}
