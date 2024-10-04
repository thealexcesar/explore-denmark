import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {CommonModule} from "@angular/common";
import {MaterialModules} from "./shared/modules/material-modules";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {ArticlesComponent} from "@pages/articles/articles.component";
import {NavbarComponent} from "@ui/navbar/navbar.component";
import {FooterComponent} from "@ui/footer/footer.component";

@Component({
  selector: 'denmark-root',
  standalone: true,
  imports: [
    ArticlesComponent,
    DemographyComponent,
    EconomyComponent,
    HistoryComponent,
    NavbarComponent,

    MaterialModules,
    CommonModule,
    MatSnackBarModule,

    RouterOutlet,
    FooterComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <denmark-navbar />
      <main class="flex-grow"> <router-outlet/> </main>
      <denmark-footer />
    </div>
  `
})
export class AppComponent {
  title = 'explore-denmark';

  constructor(private icon: FaIconLibrary) {
    this.icon.addIconPacks(fas);
  }
}
