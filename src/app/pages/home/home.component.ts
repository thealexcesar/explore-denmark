import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {NavbarComponent} from "@components/navbar/navbar.component";

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
  title = 'Explore Denmark';
}
