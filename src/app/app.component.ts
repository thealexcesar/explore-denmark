import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "@ui/header/header.component";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HomeComponent} from "@pages/home/home.component";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "@login/login.component";
import {FooterComponent} from "@ui/footer/footer.component";
import {MaterialModules} from "./shared/modules/material-modules";

@Component({
  selector: 'denmark-root',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,

    MaterialModules,
    CommonModule,

    RouterOutlet
  ],
  template: `<denmark-header id="header"/> <router-outlet/> <denmark-footer id="footer" class="mt-10"/>`
})
export class AppComponent {
  title = 'explore-denmark';

  constructor(private icon: FaIconLibrary) {
    this.icon.addIconPacks(fas);
  }
}
