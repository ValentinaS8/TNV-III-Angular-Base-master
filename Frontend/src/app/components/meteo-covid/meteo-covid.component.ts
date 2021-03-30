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


  covidCountriesData: ApiCoronaData;
  covidCountriesDataArray: Array<ApiCoronaData> = [];
  afghanistanData: ApiCoronaData;
  afghanistanDataArray: Array<ApiCoronaData> = [];
  countryName: string;
  europeCountries: Array<string> = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria",];

  dataCity: string;

  meteoCountries: ApiMeteo;

  meteoDataArray: Array<ApiMeteo> = [];


  /********************parte covid************************************/
  //funzione per il recupero dei dati METEO + COVID di tutte le nazioni

  getAllData() {
    for (let i = 0; i < (this.europeCountries).length; i++) {
      this.getCountryCovidDataFromArray(this.europeCountries[i])
    }
  }

  getAllMeteoApiData(nation) {
    this.dataCity = nation
    console.log(this.dataCity);
    this.apimeteoService.getMeteoPromiseData(this.dataCity).then((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
        console.log(response);
      },
        err => console.log("Errore")
      )
    },
      err => console.log(err),
    );
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
    this.getCountryMeteoCovidDataFromForm(form);
    this.getMeteoApiData(form);

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


  //funzione per il recupero dei dati METEO deolla nazione scelta attraverso il form 
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

  mergeArrays() {

    let matcher = 0;
    let i = 0;
    let mergedArray: Array<any> = [];
    //let arrayLength = this.covidCountriesDataArray.length;
    console.log("SONO ENTRATO NELLA MERGE");
    // console.log("Nome stato covid:", this.covidCountriesDataArray[0].data.name);
    //console.log("Nome stato meteo:", this.meteoDataArray[0].data.timezone);

    //.length restituisce il numero degli elementi (non l'indice) quindi uso <=
    while (matcher <= this.covidCountriesDataArray.length) {
      //switch
        //fai le tue cose
        //match++
      //if i === this.covidCountriesDataArray.length -> i=0

      if (this.covidCountriesDataArray[i].data.name === "Croatia" && this.meteoDataArray[i].data.timezone === "Europe/Zagreb") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;
      }

      if (this.covidCountriesDataArray[i].data.name === "Austria" && this.meteoDataArray[i].data.timezone === "Europe/Vienna") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;
      }

      if (this.covidCountriesDataArray[i].data.name === "Slovenia" && this.meteoDataArray[i].data.timezone === "Europe/Ljubljana") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Netherlands" && this.meteoDataArray[i].data.timezone === "Europe/Amsterdam") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Germany" && this.meteoDataArray[i].data.timezone === "Europe/Berlin") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Greece" && this.meteoDataArray[i].data.timezone === "Europe/Athens") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Malta" && this.meteoDataArray[i].data.timezone === "Europe/Malta") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Romania" && this.meteoDataArray[i].data.timezone === "Europe/Bucharest") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Estonia" && this.meteoDataArray[i].data.timezone === "Europe/Tallinn") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "UK" && this.meteoDataArray[i].data.timezone === "Europe/London") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Cyprus" && this.meteoDataArray[i].data.timezone === "Asia/Nicosia") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Denmark" && this.meteoDataArray[i].data.timezone === "Europe/Copenhagen") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Slovakia" && this.meteoDataArray[i].data.timezone === "Europe/Bratislava") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Luxembourg" && this.meteoDataArray[i].data.timezone === "Europe/Luxembourg") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Lithuania" && this.meteoDataArray[i].data.timezone === "Europe/Vilnius") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Latvia" && this.meteoDataArray[i].data.timezone === "Europe/Riga") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Czechia" && this.meteoDataArray[i].data.timezone === "Europe/Prague") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Hungary" && this.meteoDataArray[i].data.timezone === "Europe/Budapest") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "France" && this.meteoDataArray[i].data.timezone === "Europe/Paris") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Switzerland" && this.meteoDataArray[i].data.timezone === "Europe/Zurich") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Spain" && this.meteoDataArray[i].data.timezone === "Europe/Madrid") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Finland" && this.meteoDataArray[i].data.timezone === "Europe/Helsinki") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      
      if (this.covidCountriesDataArray[i].data.name === "Ireland" && this.meteoDataArray[i].data.timezone === "Europe/Dublin") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Italy" && this.meteoDataArray[i].data.timezone === "Europe/Rome") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Sweden" && this.meteoDataArray[i].data.timezone === "Europe/Stockholm") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Belgium" && this.meteoDataArray[i].data.timezone === "Europe/Brussels") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Portugal" && this.meteoDataArray[i].data.timezone === "Europe/Lisbon") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      if (this.covidCountriesDataArray[i].data.name === "Poland" && this.meteoDataArray[i].data.timezone === "Europe/Warsaw") {
        let meteoCovidObject = {
          country: this.covidCountriesDataArray[i].data.name,
          population: this.covidCountriesDataArray[i].data.population,
          date: this.covidCountriesDataArray[i].data.updated_at,
          today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
          today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
          total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
          total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
          death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
          temperature: this.meteoDataArray[i].data.current.temperature,
          humidity: this.meteoDataArray[i].data.current.relHumidity,
          aqi: this.meteoDataArray[i].data.current.airQualityIndex,
        }
        console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
        console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
        mergedArray.push(meteoCovidObject);
        console.log("New Data:", meteoCovidObject);

        matcher++;        
      }

      i++;
      if (i > this.covidCountriesDataArray.length) {
        i = 0;
      }      
    }
    console.log(mergedArray)
  }

}

/*
mergeArrays() {

    let mergedArray: Array<any> = [];
    //let arrayLength = this.covidCountriesDataArray.length;
    console.log("SONO ENTRATO NELLA MERGE");
   // console.log("Nome stato covid:", this.covidCountriesDataArray[0].data.name);
    //console.log("Nome stato meteo:", this.meteoDataArray[0].data.timezone);

    for (let i = 0; i < this.covidCountriesDataArray.length; i++) {

      let meteoCovidObject = {
        country: this.covidCountriesDataArray[i].data.name,
        population: this.covidCountriesDataArray[i].data.population,
        date: this.covidCountriesDataArray[i].data.updated_at,
        today_cases: this.covidCountriesDataArray[i].data.today.confirmed,
        today_deaths: this.covidCountriesDataArray[i].data.today.deaths,
        total_deaths: this.covidCountriesDataArray[i].data.latest_data.deaths,
        total_cases: this.covidCountriesDataArray[i].data.latest_data.confirmed,
        death_range: this.covidCountriesDataArray[i].data.latest_data.calculated.death_rate,
        temperature: this.meteoDataArray[i].data.current.temperature,
        humidity: this.meteoDataArray[i].data.current.relHumidity,
        aqi: this.meteoDataArray[i].data.current.airQualityIndex,
      }
      console.log("Nome stato covid:", this.covidCountriesDataArray[i].data.name);
      console.log("Nome stato meteo:", this.meteoDataArray[i].data.timezone);
      mergedArray.push(meteoCovidObject);
      console.log("New Data:", meteoCovidObject);
    }
    console.log(mergedArray)
  }
*/