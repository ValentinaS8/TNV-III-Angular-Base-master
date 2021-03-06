import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoronaCountryProva } from 'src/app/models/coronaCountryProva.model';
import { ApiCovidService } from '../../services/api-covid.service';


@Component({
  selector: 'app-prove-api-corona',
  templateUrl: './prove-api-corona.component.html',
  styleUrls: ['./prove-api-corona.component.css']
})

export class ProveApiCoronaComponent implements OnInit {

  constructor(private router: Router, private apiCovidService: ApiCovidService) { }

  covidCountriesData: CoronaCountryProva;
  afghanistanData: CoronaCountryProva;
  afghanistanDataArray: Array<CoronaCountryProva> = [];
  //countryCode : "AF";

  ngOnInit(): void {
  }

  //fa la chiamata al servizio per avere la get con i dati di tutte le nazioni
  getCountriesCovidData() {
    this.apiCovidService.getCountriesData().subscribe((data: CoronaCountryProva) =>
      this.covidCountriesData = data,
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData)
      //() => console.log("Loading countries data completed", JSON.stringify(this.covidCountriesData))
    )
  }

  getAfghanistanData() {
    this.apiCovidService.getAfghanistanData().subscribe((data: CoronaCountryProva) => {
      this.afghanistanData = data,
      this.afghanistanDataArray.push(this.afghanistanData);
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.afghanistanData)
    )
  }
  /* getOneCountryData(countryCode : string)
   {
     this.apiCovidService.getOneCountryData(countryCode).subscribe((data: CoronaCountryProva) => {
       this.oneCountryData = data;
     },
     err => console.log(err),
     () => console.log("Loading countries data completed", JSON.stringify(this.oneCountryData))
     //() => console.log("Loading countries data completed", JSON.stringify(this.covidCountriesData))
   )
  // return null;
   }*/


}
