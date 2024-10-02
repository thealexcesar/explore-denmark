import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HomeComponent} from "@pages/home/home.component";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "@login/login.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MaterialModules} from "./shared/modules/material-modules";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {ArticlesComponent} from "@pages/articles/articles.component";
import {NavbarComponent} from "@components/navbar/navbar.component";

@Component({
  selector: 'denmark-root',
  standalone: true,
  imports: [
    ArticlesComponent,
    FooterComponent,
    HeaderComponent,
    DemographyComponent,
    EconomyComponent,
    HistoryComponent,
    NavbarComponent,

    MaterialModules,
    CommonModule,
    MatSnackBarModule,

    RouterOutlet
  ],
  template: `<denmark-navbar/> <router-outlet/> <denmark-footer/>`
})
export class AppComponent {
  title = 'explore-denmark';

  constructor(private icon: FaIconLibrary) {
    this.icon.addIconPacks(fas);
  }
}
