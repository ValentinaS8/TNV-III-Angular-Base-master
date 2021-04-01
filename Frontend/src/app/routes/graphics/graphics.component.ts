import { Component, OnInit } from '@angular/core';
import { ApiMeteo } from 'src/app/models/apimeteo.model';
import { ApiMeteoService } from 'src/app/services/api-meteo.service';
import { ApiCovidService } from '../../services/api-covid.service';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ApiCountry, ApiCountryData } from '../../models/apicountry.model';
import { ApiCoronaData } from '../../models/apiCorona.model';
import { current } from '../../models/apimeteo.model';
import { CountryPipe } from '../../pipes/country.pipe';


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})

export class GraphicsComponent implements OnInit {
  updateTemperature: any;
  updateCovid: any;
  dataCity: any;
  meteoCountries: ApiMeteo;
  covidCountries: ApiCoronaData;
  meteoDataArray: number[] = [];
  humidityDataArray: number[] = [];
  windDataArray: number[] = [];
  covidDataArray: number[] = [];
  countriesToShowMeteo: string[] = [];
  countriesToShowCovid: string[] = [];
  countriesToShowHumidity: string[] = [];
  countriesToShowWind: string[] = [];

  constructor(private apimeteoService: ApiMeteoService, private apiCovidService: ApiCovidService) { }

  europe = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria"];

  ngOnInit(): void {
    for (this.dataCity of this.europe) {
      this.getMeteoApiData(this.dataCity);

    }
    for (this.dataCity of this.europe) {
      this.getCovidApiData(this.dataCity);
    }
  }

  /********************CHIAMATE ALL'API METEO E API COVID***********************/
  getMeteoApiData(dataCity: any) {
    this.apimeteoService.getMeteoApiData(this.dataCity).subscribe((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData;
      var temperature = this.meteoCountries.data.current.temperature;
      this.updateTemperature = this.meteoCountries.data.current.time;
      this.createCorrectUpdateTimeTemperature();
      var windSpeed = this.meteoCountries.data.current.windSpeed;
      var humidity = this.meteoCountries.data.current.relHumidity;
      this.meteoDataArray.push(temperature);
      this.countriesToShowMeteo.push(dataCity);
      if (this.meteoDataArray.length == 28) {
        this.createMeteoGraph();
      }
      this.humidityDataArray.push(humidity);
      this.countriesToShowHumidity.push(dataCity);
      if (this.humidityDataArray.length == 28) {
        this.createHumidityGraph();
      }
      this.windDataArray.push(windSpeed);
      this.countriesToShowWind.push(dataCity);
      if (this.windDataArray.length == 28) {
        this.createWindGraph();
      }
    });
  }

  getCovidApiData(dataCity: any) {
    this.apiCovidService.getCountryCovidData(this.dataCity).subscribe((covidData: ApiCoronaData) => {
      this.covidCountries = covidData;
      var cases = this.covidCountries.data.latest_data.confirmed;
      this.updateCovid = this.covidCountries.data.updated_at;
      this.createCorrectUpdateTimeCovid();
      this.covidDataArray.push(cases);
      this.countriesToShowCovid.push(dataCity);
      if (this.covidDataArray.length == 28) {
        this.createCovidGraph();
      }
    });
  }

  /********************CHIAMATE ALL'API METEO E API COVID***********************/

  /*******************CARICAMENTO DATI SUGLI ARRAY DEI GRAFICI E RIORDINO*******/

putDataMeteo(){
  return this.meteoDataArray;
  }

  putDataCovid() {
    return this.covidDataArray;
  }

  putDataHumidity() {
    return this.humidityDataArray;
  }
  putDataWind() {
    return this.windDataArray;
  }

  /*******************CARICAMENTO DATI SUGLI ARRAY DEI GRAFICI******************/

  /*******************ESTRAPOLAZIONE ORARIO DI AGGIORNAMENTO********************/
  createCorrectUpdateTimeTemperature(){
    if (this.updateTemperature.includes("T")) {
       this.updateTemperature = this.updateTemperature.substring(0, 10) + " " + this.updateTemperature.substring(11, 16);
    }
  }
  createCorrectUpdateTimeCovid(){
    if (this.updateCovid.includes("T")) {
       this.updateCovid = this.updateCovid.substring(0, 10) + " " + this.updateCovid.substring(11, 16);
    }
  }
    /*******************ESTRAPOLAZIONE ORARIO DI AGGIORNAMENTO********************/
    
  /*****************************CREAZIONE GRAFICI*******************************/

  createMeteoGraph() {
    let myCanvas = document.getElementById("temperature-rt");
    let myLabels = this.countriesToShowMeteo;
    const data = this.putDataMeteo();
    let chart = new Chart(myCanvas, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Temperature in tempo reale (in °C)",
          data: data,
          backgroundColor: "#9c3121",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createCovidGraph() {
    let myCanvas1 = document.getElementById("covid-rt");
    let myLabels = this.countriesToShowCovid;
    const data = this.putDataCovid();
    let chart1 = new Chart(myCanvas1, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Contagiati totali",
          data: data,
          backgroundColor: "#ebb550",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createHumidityGraph() {
    let myCanvas2 = document.getElementById("humidity-rt");
    let myLabels = this.countriesToShowHumidity;
    const data = this.putDataHumidity();
    let chart2 = new Chart(myCanvas2, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Umidità in tempo reale (in %)",
          data: data,
          backgroundColor: 'grey',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createWindGraph() {
    let myCanvas3 = document.getElementById("wind-rt");
    let myLabels = this.countriesToShowWind;
    const data = this.putDataWind();
    let chart3 = new Chart(myCanvas3, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "V. del vento in tempo reale ( in m/s)",
          data: data,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {

      }
    });
  }
  createWindCovidAnalisys() {
    let myCanvas4 = document.getElementById("wind-covid1");
    let myLabels = this.europe;
    const dataWind = this.putDataWind();
    const dataCovid = this.putDataCovid();
    let chart4 = new Chart(myCanvas4, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "V. del vento in tempo reale ( in m/s)",
          data: dataWind,
          backgroundColor: '#3C6E71',
          fill: false
        },
        {
          labels: myLabels,
          datasets: [{
            label: "Contagi totali",
            data: dataCovid,
            backgroundColor: '#3C6E71',
            fill: false
          }]
      }]},
      options: {

      }
    });
  }
  createTest2() {
    let myCanvas5 = document.getElementById("test2");
    let myLabels = this.countriesToShowWind;
    const data = this.putDataWind();
    console.log(myLabels);
    let chart5 = new Chart(myCanvas5, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "V. del vento in tempo reale ( in m/s)",
          data: data,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {

      }
    });
  }
}