import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiMeteo } from 'src/app/models/apimeteo.model';
import { ApiMeteoService } from 'src/app/services/api-meteo.service';
import { ApiCovidService } from '../../services/api-covid.service';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ApiCountry, ApiCountryData } from '../../models/apicountry.model';
import { ApiCoronaData } from '../../models/apiCorona.model';



@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  dataCity: any;
  meteoCountries: ApiMeteo;
  covidCountries: ApiCoronaData;
  meteoDataArray: number[] = [];
  humidityDataArray: number[] = [];
  covidDataArray: number[] = [];
  countriesToShow: string[] = [];

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
      var humidity = this.meteoCountries.data.current.relHumidity;
      this.meteoDataArray.push(temperature);
      this.humidityDataArray.push(humidity);
      this.countriesToShow.push(dataCity);
      console.log("MeteoData: " + this.meteoDataArray.length);
      console.log("CountriesData: " + this.meteoDataArray.length);
      console.log("HumidityData: " + this.meteoDataArray.length);
    });
  }

  getCovidApiData(dataCity: any) {
    this.apiCovidService.getCountryCovidData(this.dataCity).subscribe((covidData: ApiCoronaData) => {
      this.covidCountries = covidData;
      var cases = this.covidCountries.data.latest_data.confirmed;
      this.covidDataArray.push(cases);
      console.log("Pushato: " + cases + " casi a " + dataCity);
      this.countriesToShow.push(dataCity);
      if (this.covidDataArray.length == 28) {
        this.createCovidGraph();
      }
    });
  }

  /********************CHIAMATE ALL'API METEO E API COVID***********************/

  /*******************CARICAMENTO DATI SUGLI ARRAY DEI GRAFICI******************/

  putDataMeteo() {
    return this.meteoDataArray;
  }

  putDataCovid() {
    return this.covidDataArray;
  }

  putDataHumidity(){
    return this.humidityDataArray;
  }

  /*******************CARICAMENTO DATI SUGLI ARRAY DEI GRAFICI******************/

  /*****************************CREAZIONE GRAFICI*******************************/

  createMeteoGraph() {
    let myCanvas = document.getElementById("meteo-grafico1");
    let myLabels = this.countriesToShow;
    const data = this.putDataMeteo;
    console.log(data);

    let chart = new Chart(myCanvas, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Temperature registrate (in °C)",
          data: data,
          backgroundColor: 'blue',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createCovidGraph() {
    let myCanvas1 = document.getElementById("covid-grafico1");
    let myLabels = this.europe;
    const data = this.putDataCovid();
    console.log(data);

    let chart1 = new Chart(myCanvas1, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Casi di Covid registrati",
          data: data,
          backgroundColor: 'red',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createHumidityGraph(){
    let myCanvas2 = document.getElementById("meteo-grafico2");
    let myLabels = this.countriesToShow;
    const data = this.putDataHumidity();
    console.log(data);

    let chart = new Chart(myCanvas2, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Umidità registrata (in %)",
          data: data,
          backgroundColor: 'clear-blue',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  /*****************************CREAZIONE GRAFICI*******************************/


}