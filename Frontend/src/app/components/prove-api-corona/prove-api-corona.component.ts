import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ApiCoronaData } from 'src/app/models/apiCorona.model';
import { ApiCovidService } from '../../services/api-covid.service';


@Component({
  selector: 'app-prove-api-corona',
  templateUrl: './prove-api-corona.component.html',
  styleUrls: ['./prove-api-corona.component.css']
})

export class ProveApiCoronaComponent implements OnInit {

  constructor(private router: Router, private apiCovidService: ApiCovidService) { }

  covidCountriesData: ApiCoronaData;
  afghanistanData: ApiCoronaData;
  afghanistanDataArray: Array<ApiCoronaData> = [];
  //countryCode : "AF";

  ngOnInit(): void {
  }

  //fa la chiamata al servizio per avere la get con i dati di tutte le nazioni
  getCountriesCovidData() {
    this.apiCovidService.getCountriesData().subscribe((data: ApiCoronaData) =>
      this.covidCountriesData = data,
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData)     
    )
  }

  getAfghanistanData() {
    this.apiCovidService.getAfghanistanData().subscribe((data: ApiCoronaData) => {
      this.afghanistanData = data;

      /*il campo che contiene la data all'interno del file json contiene 
      anche l'orario -> estrapolo la data*/ 
      for (let item in this.afghanistanData) {        
        if(this.afghanistanData.data.updated_at.includes("T"))
        {
          let correctData = this.afghanistanData.data.updated_at.substring(0, 10);
          this.afghanistanData.data.updated_at = correctData;          
        }
      }      
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
