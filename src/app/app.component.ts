import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "@ui/header/header.component";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HomeComponent} from "@pages/denmark/home/home.component";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "@login/login.component";
import {FooterComponent} from "@ui/footer/footer.component";
import {MaterialModules} from "./shared/modules/material-modules";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {EconomyComponent} from "@pages/denmark/economy/economy.component";
import {DemographyComponent} from "@pages/denmark/demography/demography.component";
import {HistoryComponent} from "@pages/denmark/history/history.component";
import {ArticlesComponent} from "@pages/articles/articles.component";

@Component({
  selector: 'denmark-root',
  standalone: true,
  imports: [
    ArticlesComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    DemographyComponent,
    EconomyComponent,
    HistoryComponent,
    LoginComponent,

    MaterialModules,
    CommonModule,
    MatSnackBarModule,

    RouterOutlet
  ],
  template: `<denmark-header id="header"/> <router-outlet/> <denmark-footer id="footer"/>`
})
export class AppComponent {
  title = 'explore-denmark';

  constructor(private icon: FaIconLibrary) {
    this.icon.addIconPacks(fas);
  }
}
