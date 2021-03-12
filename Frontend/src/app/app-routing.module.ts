import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { EditComponent } from './routes/edit/edit.component';
import { FilterDoubleComponent } from './routes/filter-double/filter-double.component';
import { SortingbydeathComponent } from './routes/sortingbydeath/sortingbydeath.component';
import { SortByComponent } from './routes/sort-by/sort-by.component';
import { WelcomepageComponent } from './routes/welcomepage/welcomepage.component';
import { FilterbycountryComponent } from './routes/filterbycountry/filterbycountry.component';
import { ApiComponent } from './routes/api/api.component';
import { ApiMeteoComponent } from './routes/api-meteo/api-meteo.component';
import { GraphicsComponent } from './routes/graphics/graphics.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
  { path: "", redirectTo: '/welcome', pathMatch: 'full' },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "add", component: AddComponent },
  { path: "details/:id", component: DetailsComponent },
  { path: "edit/:id", component: EditComponent },
  { path: "filterdouble", component: FilterDoubleComponent },
  { path: "sortingbydeath", component: SortingbydeathComponent },
  { path: "sortBy", component: SortByComponent },
  { path: "welcome", component: WelcomepageComponent },
  { path: "filterByCountry", component: FilterbycountryComponent },
  { path: "apicorona", component: ApiComponent },
  { path: "apimeteo", component: ApiMeteoComponent },
  { path: "graphics", component: GraphicsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
