import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './routes/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterDoubleComponent } from './routes/filter-double/filter-double.component';
import { ContinentclassificationPipe } from './pipes/continentclassification.pipe';
import { SortingbydeathComponent } from './routes/sortingbydeath/sortingbydeath.component';
import { SortByComponent } from './routes/sort-by/sort-by.component';
import { WelcomepageComponent } from './routes/welcomepage/welcomepage.component';
import { FilterbycountryComponent } from './routes/filterbycountry/filterbycountry.component';
import { CountryPipe } from './pipes/country.pipe';
import { LoadingpageComponent } from './components/loadingpage/loadingpage.component';
import { ApiserviceService } from './services/apiservice.service';
import { ApiComponent } from './routes/api/api.component';
import { ApiMeteoService } from './services/api-meteo.service';
import { ApiMeteoComponent } from './routes/api-meteo/api-meteo.component';
import { GraphicsComponent } from './routes/graphics/graphics.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    FilterDoubleComponent,
    ContinentclassificationPipe,
    SortingbydeathComponent,
    SortByComponent,
    LoadingpageComponent,
    WelcomepageComponent,
    FilterbycountryComponent,
    CountryPipe,
    ApiComponent,
    ApiMeteoComponent,
    GraphicsComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, ApiserviceService, ApiMeteoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
