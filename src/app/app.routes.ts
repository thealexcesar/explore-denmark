import {Routes} from '@angular/router';
import {HomeComponent} from "@pages/denmark/home/home.component";
import {LoginComponent} from "@login/login.component";
import {DemographyComponent} from "@pages/denmark/demography/demography.component";
import {HistoryComponent} from "@pages/denmark/history/history.component";
import {EconomyComponent} from "@pages/denmark/economy/economy.component";
import {GeographyComponent} from "@pages/denmark/geography/geography.component";
import {ArticlesComponent} from "@pages/articles/articles.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},
  {path: 'demography', component: DemographyComponent},
  {path: 'economy', component: EconomyComponent},
  {path: 'geography', component: GeographyComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'login', component: LoginComponent},
];
