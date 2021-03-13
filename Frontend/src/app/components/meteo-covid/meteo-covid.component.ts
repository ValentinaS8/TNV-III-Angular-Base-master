import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCoronaData } from 'src/app/models/apiCorona.model';
import { ApiCovidService } from 'src/app/services/api-covid.service';
import { CovidService } from 'src/app/services/covid.service';
import { ApiMeteoService } from '../../services/api-meteo.service';
import { MeteoService } from '../../services/meteo.service';
import { ApiMeteo } from '../../models/apimeteo.model';
import { MeteoCovidData } from 'src/app/models/meteoCovidData.model';

@Component({
  selector: 'app-meteo-covid',
  templateUrl: './meteo-covid.component.html',
  styleUrls: ['./meteo-covid.component.css']
})
export class MeteoCovidComponent implements OnInit {

  constructor(private router: Router, private covidService: CovidService, private apiCovidService: ApiCovidService,
    private apimeteoService: ApiMeteoService, private meteoService: MeteoService) { }

  ngOnInit(): void {
  }


  covidCountriesData: ApiCoronaData;
  covidCountriesDataArray: Array<ApiCoronaData> = [];
  afghanistanData: ApiCoronaData;
  afghanistanDataArray: Array<ApiCoronaData> = [];
  countryName: string;
  europeCountries: Array<string> = ["Austria","Belgio","Cipro","Croazia","Danimarca","Estonia",
  "Finlandia","Francia","Germania","Grecia","Irlanda","Italia","Lettonia","Lituania","Lussemburgo",
  "Malta","Paesi Bassi","Polonia","Portogallo","Regno Unito","Repubblica Ceca","Romania",
  "Slovacchia","Slovenia","Spagna","Svezia","Svizzera","Ungheria"];

  dataCity: string;
 
  meteoCountries: ApiMeteo;

  meteoDataArray: Array<ApiMeteo> = [];

  meteoCovidDataArray: Array<MeteoCovidData> = [];


  /********************parte covid************************************/
  //funzione per il recupero dei dati METEO + COVID di tutte le nazioni
  
 getAllData(){
   for (let i=0;i < (this.europeCountries).length; i++){
    this.getCountryCovidDataFromArray(this.europeCountries[i])
    this.getAllMeteoApiData(this.europeCountries[i])
   }}

   getAllMeteoApiData(nation){     
    this.dataCity = nation
    console.log(this.dataCity);
    this.apimeteoService.getMeteoApiData(this.dataCity).subscribe((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
      console.log(response);
        this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
          console.log(response);
        },
    
          err => console.log("Errore")
    
        )
      },
        err => console.log("Errore")
      )
    },
      err => console.log(err),
      () => console.log("Loading completed", this.meteoCountries)

    );
   }
 
  //funzione per il recupero dei dati COVID di tutte le nazioni
  getAllEuropeCountriesCovidData() {
    //console.log("sono entrato nella funzione");
    for (let i = 0; i < (this.europeCountries).length; i++) {
      //console.log(this.europeCountries[i]);
      this.getCountryCovidDataFromArray(this.europeCountries[i]);
    }
  }

  getCountryCovidDataFromArray(countryName: string) {
    this.apiCovidService.getCountryCovidData(countryName).subscribe((data: ApiCoronaData) => {
      this.covidCountriesData = data;

      /*il campo che contiene la data all'interno del file json contiene 
       anche l'orario -> estrapolo la data*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        //{{(this.afghanistanData.data.latest_data.calculated.death_rate) | number: '2.2-2'}}
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);//questo corrisponde a  this.dataEntry = form.form.value;
      //chiama il servizio del db e gli dà i dati da scrivere            
      this.covidService.addCovidEntry(this.covidCountriesData).subscribe(response => {
        console.log("Ho inviato i dati al db")
        //this.router.navigate(['/dashboard']);
      }
      )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData.data.latest_data)
    )
  }
  // Funzione che fa la chiamata sincronizzata dei dati covid e dei dati meteo
getCovidMeteoApiData(form: NgForm){
  this.getCountryMeteoCovidDataFromForm(form);
  this.getMeteoApiData(form);

}

  // dati covid per ogni singola nazione
  getCountryMeteoCovidDataFromForm(form) {
    this.countryName = form.form.value.country;
    console.log(this.countryName);
    this.apiCovidService.getCountryCovidData(this.countryName).subscribe((data: ApiCoronaData) => {
      this.covidCountriesData = data;

      /*il campo che contiene la data all'interno del file json contiene 
       anche l'orario -> estrapolo la data*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        //{{(this.afghanistanData.data.latest_data.calculated.death_rate) | number: '2.2-2'}}
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);//questo corrisponde a  this.dataEntry = form.form.value;
      //chiama il servizio del db e gli dà i dati da scrivere            
      this.covidService.addCovidEntry(this.covidCountriesData).subscribe(response => {
        console.log("Ho inviato i dati al db")
        //this.router.navigate(['/dashboard']);
      }
      )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData.data.latest_data)
    )
  }

  /********************parte meteo************************************/

  //funzione per il recupero dei dati METEO della nazione scelta attraverso il form 
  getMeteoApiData(form) {
    this.dataCity = form.form.value.country
    console.log(this.dataCity);
    this.apimeteoService.getMeteoApiData(this.dataCity).subscribe((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      //scrittura a db
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
        console.log(response);
        this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
          console.log(response);
        },
    
          err => console.log("Errore")
    
        )
      },
        err => console.log("Errore")
      )
    },
      err => console.log(err),
      () => console.log("Loading completed", this.meteoCountries)

    );

  }


  // funzione da inserire all'interno della getMeteo al fine di fare tutto in un unico passo
 /* postMeteoApiData(meteoCountries: ApiMeteo) {
    this.meteoCountries;
    console.log(meteoCountries.data.current.airQualityIndex)

    this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
      console.log(response);
    },

      err => console.log("Errore")

    )
  }*/

  //Funzione che crea un terzo array a partire dall'array di dati covid e meteo
  createArray()
  {
    //cicla per l'array covid
    for (let i = 0; i < (this.covidCountriesDataArray).length; i++) {
      //console.log(this.europeCountries[i]);
      this.meteoCovidDataArray[i].covidModel.data.population = this.covidCountriesDataArray[i].data.population;
      this.meteoCovidDataArray[i].covidModel.data.updated_at =  this.covidCountriesDataArray[i].data.updated_at;
      this.meteoCovidDataArray[i].covidModel.data.today.deaths = this.covidCountriesDataArray[i].data.today.deaths;
      this.meteoCovidDataArray[i].covidModel.data.today.confirmed = this.covidCountriesDataArray[i].data.today.confirmed;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.deaths = this.covidCountriesDataArray[i].data.latest_data.deaths;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.confirmed = this.covidCountriesDataArray[i].data.latest_data.confirmed;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.calculated.death_rate = this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.calculated.cases_per_million_population = this.covidCountriesDataArray[i].data.latest_data.calculated.cases_per_million_population;
    }

    //cicla per l'array meteo
    for (let i = 0; i < (this.meteoDataArray).length; i++) {
      //console.log(this.europeCountries[i]);
      this.meteoCovidDataArray[i].meteoModel.data.current.airQualityIndex = this.meteoDataArray[i].data.current.airQualityIndex;
      this.meteoCovidDataArray[i].covidModel.data.updated_at =  this.covidCountriesDataArray[i].data.updated_at;
      this.meteoCovidDataArray[i].covidModel.data.today.deaths = this.covidCountriesDataArray[i].data.today.deaths;
      this.meteoCovidDataArray[i].covidModel.data.today.confirmed = this.covidCountriesDataArray[i].data.today.confirmed;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.deaths = this.covidCountriesDataArray[i].data.latest_data.deaths;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.confirmed = this.covidCountriesDataArray[i].data.latest_data.confirmed;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.calculated.death_rate = this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate;
      this.meteoCovidDataArray[i].covidModel.data.latest_data.calculated.cases_per_million_population = this.covidCountriesDataArray[i].data.latest_data.calculated.cases_per_million_population;
    }

  }

}
/*
export interface ApiMeteo{
    data: current 
}

export interface current{
    timezone : string;
    current : ApiMeteoData
}
export interface ApiMeteoData{
    
       
    temperature : number,
    temperatureMax : number,
    temperatureMin : number,
    relHumidity : number,
    airQualityIndex: number,
}
*/