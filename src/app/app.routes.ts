import {Routes} from '@angular/router';
import {HomeComponent} from "@pages/home/home.component";
import {LoginComponent} from "@login/login.component";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {GeographyComponent} from "@pages/home/geography/geography.component";
import {ArticlesComponent} from "@pages/articles/articles.component";
import {DashboardComponent} from "@pages/dashboard/dashboard.component";
import {ArticleListComponent} from "@pages/admin/articles/components/article-list/article-list.component";
import {UserListComponent} from "@pages/admin/users/components/user-list/user-list.component";
import {ArticleFormComponent} from "@pages/admin/articles/pages/article-form/article-form.component";
import {ArticleDetailComponent} from "@pages/admin/articles/pages/article-detail/article-detail.component";
import {UserFormComponent} from "@pages/admin/users/pages/user-form/user-form.component";
import {UserDetailComponent} from "@pages/admin/users/pages/user-detail/user-detail.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'demography', component: DemographyComponent},
  {path: 'economy', component: EconomyComponent},
  {path: 'geography', component: GeographyComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'login', component: LoginComponent},

  { path: 'admin/dashboard', component: DashboardComponent },
  {
    path: 'admin/articles',
    children: [
      { path: '', component: ArticleListComponent },
      { path: 'new', component: ArticleFormComponent },
      { path: 'edit/:id', component: ArticleFormComponent },
      { path: ':id', component: ArticleDetailComponent },
    ],
  },
  {
    path: 'admin/users',
    children: [
      { path: '', component: UserListComponent },
      { path: 'new', component: UserFormComponent },
      { path: 'edit/:id', component: UserFormComponent },
      { path: ':id', component: UserDetailComponent },
    ],
  },
];
