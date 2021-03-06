import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCoronaData } from 'src/app/models/apiCorona.model';
import { ApiCovidService } from 'src/app/services/api-covid.service';
import { CovidService } from 'src/app/services/covid.service';
import { ApiMeteoService } from '../../services/api-meteo.service';
import { MeteoService } from '../../services/meteo.service';
import { ApiMeteo } from '../../models/apimeteo.model';
import { MeteoCovid } from '../../models/meteoCovid.model';


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


  isFetching: boolean = false;

  covidCountriesData: ApiCoronaData;
  covidCountriesDataArray: Array<ApiCoronaData> = [];
  countryName: string;

  europeCountries: Array<string> = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria",];
 

  arrayRiferimentoStati: string[] = ["Austria", "Belgium", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia",
    "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
    "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
    "UK"];

  arrayRiferimentoMeteo: string[] = ["Europe/Vienna", "Europe/Brussels", "Europe/Zagreb",
    "Asia/Nicosia", "Europe/Prague", "Europe/Copenhagen", "Europe/Tallinn", "Europe/Helsinki", "Europe/Paris",
    "Europe/Berlin", "Europe/Athens", "Europe/Budapest", "Europe/Dublin", "Europe/Rome", "Europe/Riga",
    "Europe/Vilnius", "Europe/Luxembourg", "Europe/Malta", "Europe/Amsterdam", "Europe/Warsaw", "Europe/Lisbon", 
    "Europe/Bucharest", "Europe/Bratislava", "Europe/Ljubljana", "Europe/Madrid", "Europe/Stockholm", 
    "Europe/Zurich", "Europe/London"];


  dataCity: string;

  meteoCountries: ApiMeteo;

  meteoDataArray: Array<ApiMeteo> = [];

  meteoCovidArray: Array<MeteoCovid> = [];

  //array di appoggio per effettuare il sort degli array ricavati dalle api
  sortedCovidCountriesDataArray: Array<ApiCoronaData> = [];
  sortedMeteoDataArray: Array<ApiMeteo> = [];



  /********************parte covid************************************/
  //funzione per il recupero dei dati METEO + COVID di tutte le nazioni
  getAllData(form: NgForm) {

    this.isFetching = true;

    if ((this.meteoCovidArray.length) > 0) {
      this.meteoCovidArray = [];
    }

    //reset della nazione scelta nel form
    form.form.reset("");

    for (let i = 0; i < (this.europeCountries).length; i++) {
      this.getCountryCovidDataFromArray(this.europeCountries[i])
    }

    //imposto un timer in modo che la merge venga chiamata solo dopo il fetch dei dati delle api
    setTimeout(() => { this.mergeArrays(); }, 7000);

  }

  getCountryCovidDataFromArray(countryName: string) {
    this.apiCovidService.getCovidPromiseData(countryName).then((data: ApiCoronaData) => {
      this.covidCountriesData = data;
      this.dataCity = countryName
      console.log(this.dataCity);
      this.apimeteoService.getMeteoPromiseData(this.dataCity).then((meteoData: ApiMeteo) => {
        this.meteoCountries = meteoData
        this.meteoDataArray.push(this.meteoCountries)
        console.log(this.meteoCountries.data.current.temperatureMin)
        this.meteoService.addMeteoPromiseEntry(this.meteoCountries).then(response => {
          console.log(response);
        },
          err => console.log("Errore")
        )
      },
        err => console.log(err),
      );

      /*Estrapolazione del valore "Data" dal file .json*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);
      this.covidService.addCovidPromiseEntry(this.covidCountriesData).then(response => {
        console.log("Ho inviato i dati al db", response)
      }
      )
    },
      err => console.log(err),

    )
  }

  // chiamata sincronizzata dei dati covid e dei dati meteo per ogni singola nazione
  getCovidMeteoApiData(form: NgForm) {

    this.isFetching = true;

    if ((this.meteoCovidArray.length) > 0) {
      this.meteoCovidArray = [];
    }

    this.getCountryMeteoCovidDataFromForm(form);
    this.getMeteoApiData(form);

    //imposto un timer in modo che la merge venga chiamata solo dopo il fetch dei dati delle api
    //funzione di merge dei dati covid e meteo per la corretta visualizzazione attraverso il file html
    setTimeout(() => { this.mergeSingleObjects(); }, 3000);
  }

  // dati covid per ogni singola nazione
  getCountryMeteoCovidDataFromForm(form: NgForm) {
    this.countryName = form.form.value.country;
    console.log(this.countryName);
    this.apiCovidService.getCountryCovidData(this.countryName).subscribe((data: ApiCoronaData) => {
      this.covidCountriesData = data;

      /*Estrapolazione del valore "Data" dal file .json*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);
      this.covidService.addCovidEntry(this.covidCountriesData).subscribe(response => {
        console.log("Ho inviato i dati al db")
      }
      )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData.data.latest_data)
    )
  }

  /********************parte meteo************************************/

  //funzione per il recupero dei dati METEO della nazione scelta attraverso il form 
  getMeteoApiData(form: NgForm) {

    this.dataCity = form.form.value.country
    console.log(this.dataCity);
    this.apimeteoService.getMeteoApiData(this.dataCity).subscribe((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      //scrittura a db
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
        console.log(response);
      },
        err => console.log("Errore")
      )
    },
      err => console.log(err),
      () => console.log("Loading completed", this.meteoCountries)

    );
  }


  sortArrays() {

    let i, j;

    //sort array dati covid
    for (i = 0; i < this.arrayRiferimentoStati.length; i++) {

      for (j = 0; j < this.covidCountriesDataArray.length; j++) {
        if (this.arrayRiferimentoStati[i] === this.covidCountriesDataArray[j].data.name) {
          this.sortedCovidCountriesDataArray[i] = this.covidCountriesDataArray[j];
        }
      }

      j = 0;
    }

    //sort array dati meteo
    for (i = 0; i < this.arrayRiferimentoMeteo.length; i++) {

      for (j = 0; j < this.meteoDataArray.length; j++) {
        if (this.arrayRiferimentoMeteo[i] === this.meteoDataArray[j].data.timezone) {
          this.sortedMeteoDataArray[i] = this.meteoDataArray[j];
        }
      }

      j = 0;
    }
  }

  mergeSingleObjects() {

    let newData: MeteoCovid = {
      country: this.covidCountriesData.data.name,
      population: (this.covidCountriesData.data.population).toString(),
      date: this.covidCountriesData.data.updated_at,
      today_cases: this.covidCountriesData.data.today.confirmed,
      today_deaths: this.covidCountriesData.data.today.deaths,
      total_deaths: this.covidCountriesData.data.latest_data.deaths,
      total_cases: this.covidCountriesData.data.latest_data.confirmed,
      death_range: this.covidCountriesData.data.latest_data.calculated.death_rate,
      temperature: this.meteoCountries.data.current.temperature,
      humidity: this.meteoCountries.data.current.relHumidity,
      aqi: this.meteoCountries.data.current.airQualityIndex,
    }
    this.meteoCovidArray.push(newData);
    console.log("New Data:", newData);

    console.log(this.meteoCovidArray)

    this.isFetching = false;
  }

  mergeArrays() {

    //affinch?? si possa fare correttamente la merge tra i due array, ?? necessario riordinarli
    this.sortArrays();

    for (let i = 0; i < this.sortedCovidCountriesDataArray.length; i++) {

      let newData: MeteoCovid = {
        country: this.sortedCovidCountriesDataArray[i].data.name,
        population: (this.sortedCovidCountriesDataArray[i].data.population).toString(),
        date: this.sortedCovidCountriesDataArray[i].data.updated_at,
        today_cases: this.sortedCovidCountriesDataArray[i].data.today.confirmed,
        today_deaths: this.sortedCovidCountriesDataArray[i].data.today.deaths,
        total_deaths: this.sortedCovidCountriesDataArray[i].data.latest_data.deaths,
        total_cases: this.sortedCovidCountriesDataArray[i].data.latest_data.confirmed,
        death_range: this.sortedCovidCountriesDataArray[i].data.latest_data.calculated.death_rate,
        temperature: this.sortedMeteoDataArray[i].data.current.temperature,
        humidity: this.sortedMeteoDataArray[i].data.current.relHumidity,
        aqi: this.sortedMeteoDataArray[i].data.current.airQualityIndex,
      }
      this.meteoCovidArray.push(newData);
      console.log("New Data:", newData);
    }
    console.log(this.meteoCovidArray)

    this.isFetching = false;
  }

  clearAllData(form: NgForm) {

    this.isFetching = false;

    if ((this.meteoCovidArray.length) > 0) {
      this.meteoCovidArray = [];
    }

    //reset della nazione scelta nel form
    form.form.reset("");
  }


}

