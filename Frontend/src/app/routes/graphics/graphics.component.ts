import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiMeteo } from 'src/app/models/apimeteo.model';
import { ApiMeteoService } from 'src/app/services/api-meteo.service';
import { ApiCovidService } from '../../services/api-covid.service';
import { ApiCoronaData } from '../../models/apiCorona.model';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})

export class GraphicsComponent implements OnInit {
  //Orario della chiamata all'API
  updateMeteoData: any;
  updateCovidData: any;
  //Città da chiamare
  dataCity: any;
  //Model di appoggio per il GET
  meteoCountries: ApiMeteo;
  covidCountries: ApiCoronaData;
  //Array per la prima registrazione dei dati
  temperatureDataArray: number[] = [];
  temperatureMinDataArray: number[] = [];
  temperatureMaxDataArray: number[] = [];
  airQualityDataArray: number[] = [];
  humidityDataArray: number[] = [];
  windDataArray: number[] = [];
  populationDataArray: number[] = [];
  totalCasesDataArray: number[] = [];
  todayCasesDataArray: number[] = [];
  totalDeathsDataArray: number[] = [];
  todayDeathsDataArray: number[] = [];
  deathRateDataArray: number[] = [];
  casesPerMillionDataArray: number[] = [];
  //Array con i dati ordinati
  temperatureDataArraySorted: number[] = [];
  temperatureMinDataArraySorted: number[] = [];
  temperatureMaxDataArraySorted: number[] = [];
  airQualityDataArraySorted: number[] = [];
  humidityDataArraySorted: number[] = [];
  windDataArraySorted: number[] = [];
  populationArraySorted: number[] = [];
  totalCasesDataArraySorted: number[] = [];
  todayCasesDataArraySorted: number[] = [];
  totalDeathsDataArraySorted: number[] = [];
  todayDeathsDataArraySorted: number[] = [];
  deathRateDataArraySorted: number[] = [];
  casesPerMillionDataArraySorted: number[] = [];
  //Array per riordinare i valori in base al paese chiamato
  countriesToShowTemperature: string[] = [];
  countriesToShowTemperatureMin: string[] = [];
  countriesToShowTemperatureMax: string[] = [];
  countriesToShowAirQuality: string[] = [];
  countriesToShowHumidity: string[] = [];
  countriesToShowWind: string[] = [];
  countriesToShowPopulation: string[] = [];
  countriesToShowTotalCases: string[] = [];
  countriesToShowTodayCases: string[] = [];
  countriesToShowTotalDeaths: string[] = [];
  countriesToShowTodayDeaths: string[] = [];
  countriesToShowDeathRate: string[] = [];
  countriesToShowCasesPerMillion: string[] = [];
  //Percentuali da mostare nelle analisi
  percentualNumbersOfCovidWindAnalisys: number;
  //Array degli stati europei
  europe: Array<string> = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria"];
  //Array degli stati europei in inglese
  europeTranslate: Array<string> = ["Austria", "Belgium", "Cyprus", "Croatia", "Denmark", "Estonia", "Finland",
    "France", "Germany", "Greece", "Ireland", "Italy", "Latvia", "Lithuania", "Luxemburg", "Malta", "Netherlands",
    "Poland", "Portugal", "UK", "Czech Republic", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Hungary"];
  //Verifica che sia morto qualcuno di Covid nel paese selezionato
  isAnibodyDead: boolean;
  isDeadFetching = false;
  //Verifica che sia contagiato qualcuno di Covid nel paese selezionato
  isAnibodyInjured: boolean;

  constructor(private apimeteoService: ApiMeteoService, private apiCovidService: ApiCovidService) { }

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
      //Salvataggio del file JSON
      this.meteoCountries = meteoData;
      //Aggiornamento orario di ricezione del file JSON e correzione
      this.updateMeteoData = this.meteoCountries.data.current.time;
      this.createCorrectUpdateTimeTemperature();
      //Assegnazione dei valori 
      var temperature = this.meteoCountries.data.current.temperature;
      var temperatureMin = this.meteoCountries.data.current.temperatureMin;
      var temperatureMax = this.meteoCountries.data.current.temperatureMax;
      var airQuality = this.meteoCountries.data.current.airQualityIndex;
      var humidity = this.meteoCountries.data.current.relHumidity;
      var windSpeed = this.meteoCountries.data.current.windSpeed;
      //Salvataggio della temperatura attuale
      this.temperatureDataArray.push(temperature);
      this.countriesToShowTemperature.push(dataCity);
      if (this.temperatureDataArray.length == 28) {
        this.sortTemperatureDataArray();
        this.createMeteoGraph("temperature-rt");
        this.createTemperatureRatioChart();
      }
      //Salvataggio della temperatura massima
      this.temperatureMaxDataArray.push(temperatureMax);
      this.countriesToShowTemperatureMax.push(dataCity);
      if (this.temperatureMaxDataArray.length == 28) {
        this.sortTemperatureMaxDataArray();
        this.createMaxTemperatureRatioChart();
      }
      //Salvataggio della temperatura minima
      this.temperatureMinDataArray.push(temperatureMin);
      this.countriesToShowTemperatureMin.push(dataCity);
      if (this.temperatureMinDataArray.length == 28) {
        this.sortTemperatureMinDataArray();
        this.createMinTemperatureRatioChart();
      }
      //Salvataggio della qualità dell'aria
      this.airQualityDataArray.push(airQuality);
      this.countriesToShowAirQuality.push(dataCity);
      if (this.airQualityDataArray.length == 28) {
        this.sortAirQualityDataArray();
      }
      //Salvataggio dell'umidità
      this.humidityDataArray.push(humidity);
      this.countriesToShowHumidity.push(dataCity);
      if (this.humidityDataArray.length == 28) {
        this.sortHumidityDataArray();
        this.createHumidityGraph("humidity-rt");
        this.createHumidityRatioChart();
      }
      //Salvataggio della velocità del vento
      this.windDataArray.push(windSpeed);
      this.countriesToShowWind.push(dataCity);
      if (this.windDataArray.length == 28) {
        this.sortWindDataArray();
        this.createWindGraph("wind-rt");
        this.createWindSpeedRatioChart();
      }
    });
  }

  getCovidApiData(dataCity: any) {
    this.apiCovidService.getCountryCovidData(this.dataCity).subscribe((covidData: ApiCoronaData) => {
      this.covidCountries = covidData;
      var population = this.covidCountries.data.population;
      var totalCases = this.covidCountries.data.latest_data.confirmed;
      var todayCases = this.covidCountries.data.today.confirmed;
      var totalDeaths = this.covidCountries.data.latest_data.deaths;
      var todayDeaths = this.covidCountries.data.today.deaths;
      var deathRate = this.covidCountries.data.latest_data.calculated.death_rate;
      var casesPerMillion = this.covidCountries.data.latest_data.calculated.cases_per_million_population;
      this.updateCovidData = this.covidCountries.data.updated_at;
      this.createCorrectUpdateTimeCovid();
      //Salvataggio della popolazione
      this.populationDataArray.push(population);
      this.countriesToShowPopulation.push(dataCity);
      if (this.populationDataArray.length == 28) {
      this.sortPopulationDataArray();
      }
      //Salvataggio dei casi totali
      this.totalCasesDataArray.push(totalCases);
      this.countriesToShowTotalCases.push(dataCity);
      if (this.totalCasesDataArray.length == 28) {
        this.sortTotalCasesCovidArray();
        this.createTotalCasesCovidGraph("covid-total-cases-rt");
        this.createCasesPopulationRatioChart();
        this.createCasesRatioChart();
        this.createCasesRatioChart1();
        this.createCasesRatioChart2();
      }
      //Salvataggio dei casi di oggi
      this.todayCasesDataArray.push(todayCases);
      this.countriesToShowTodayCases.push(dataCity);
      if (this.todayCasesDataArray.length == 28) {
        this.sortTodayCasesCovidArray();
      }
      //Salvataggio dei morti totali
      this.totalDeathsDataArray.push(totalDeaths);
      this.countriesToShowTotalDeaths.push(dataCity);
      if (this.totalDeathsDataArray.length == 28) {
        this.sortTotalDeathsCovidArray();
        this.createTotalDeathsCovidGraph("covid-total-deaths-rt");
      }
      //Salvataggio dei morti di oggi
      this.todayDeathsDataArray.push(todayDeaths);
      this.countriesToShowTodayDeaths.push(dataCity);
      if (this.todayDeathsDataArray.length == 28) {
        this.sortTodayDeathsCovidArray();
      }
      //Salvataggio del Death Rate
      this.deathRateDataArray.push(deathRate);
      this.countriesToShowDeathRate.push(dataCity);
      if (this.deathRateDataArray.length == 28) {
        this.sortDeathRateDataArray();
        this.createCasesDeathsRatioChart();
        this.createCasesDeathsRatioChart1();
        this.createCasesDeathsRatioChart2();
      }
      //Salvataggio del Cases Per Million
      this.casesPerMillionDataArray.push(casesPerMillion);
      this.countriesToShowCasesPerMillion.push(dataCity);
      if (this.casesPerMillionDataArray.length == 28) {
        this.sortCasesPerMillionDataArray();
      }
    });
  }

  /********************CHIAMATE ALL'API METEO E API COVID***********************/

  /**************************RIORDINO DEGLI ARRAY*******************************/
  sortTemperatureDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTemperature.length; j++) {
        if (this.europe[i] === this.countriesToShowTemperature[j]) {
          this.temperatureDataArraySorted[i] = this.temperatureDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortTemperatureMaxDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTemperatureMax.length; j++) {
        if (this.europe[i] === this.countriesToShowTemperatureMax[j]) {
          this.temperatureMaxDataArraySorted[i] = this.temperatureMaxDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortTemperatureMinDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTemperatureMin.length; j++) {
        if (this.europe[i] === this.countriesToShowTemperatureMin[j]) {
          this.temperatureMinDataArraySorted[i] = this.temperatureMinDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortAirQualityDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowAirQuality.length; j++) {
        if (this.europe[i] === this.countriesToShowAirQuality[j]) {
          this.airQualityDataArraySorted[i] = this.airQualityDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortHumidityDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowHumidity.length; j++) {
        if (this.europe[i] === this.countriesToShowHumidity[j]) {
          this.humidityDataArraySorted[i] = this.humidityDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortWindDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowWind.length; j++) {
        if (this.europe[i] === this.countriesToShowWind[j]) {
          this.windDataArraySorted[i] = this.windDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortPopulationDataArray(){
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowPopulation.length; j++) {
        if (this.europe[i] === this.countriesToShowPopulation[j]) {
          this.populationArraySorted[i] = this.populationDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortTotalCasesCovidArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTotalCases.length; j++) {
        if (this.europe[i] === this.countriesToShowTotalCases[j]) {
          this.totalCasesDataArraySorted[i] = this.totalCasesDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortTodayCasesCovidArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTodayCases.length; j++) {
        if (this.europe[i] === this.countriesToShowTodayCases[j]) {
          this.todayCasesDataArraySorted[i] = this.todayCasesDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortTotalDeathsCovidArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTotalDeaths.length; j++) {
        if (this.europe[i] === this.countriesToShowTotalDeaths[j]) {
          this.totalDeathsDataArraySorted[i] = this.totalDeathsDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortTodayDeathsCovidArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowTodayDeaths.length; j++) {
        if (this.europe[i] === this.countriesToShowTodayDeaths[j]) {
          this.todayDeathsDataArraySorted[i] = this.todayDeathsDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortDeathRateDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowDeathRate.length; j++) {
        if (this.europe[i] === this.countriesToShowDeathRate[j]) {
          this.deathRateDataArraySorted[i] = this.deathRateDataArray[j];
        }
      }

      j = 0;
    }
  }
  sortCasesPerMillionDataArray() {
    let i, j;
    for (i = 0; i < this.europe.length; i++) {

      for (j = 0; j < this.countriesToShowCasesPerMillion.length; j++) {
        if (this.europe[i] === this.countriesToShowCasesPerMillion[j]) {
          this.casesPerMillionDataArraySorted[i] = this.casesPerMillionDataArray[j];
        }
      }

      j = 0;
    }
  }
  /**************************RIORDINO DEGLI ARRAY ******************************/

  /*******************ESTRAPOLAZIONE ORARIO DI AGGIORNAMENTO********************/
  createCorrectUpdateTimeTemperature() {
    if (this.updateMeteoData.includes("T")) {
      this.updateMeteoData = this.updateMeteoData.substring(0, 10) + " " + this.updateMeteoData.substring(11, 16);
    }
  }
  createCorrectUpdateTimeCovid() {
    if (this.updateCovidData.includes("T")) {
      this.updateCovidData = this.updateCovidData.substring(0, 10) + " " + this.updateCovidData.substring(11, 16);
    }
  }
  /*******************ESTRAPOLAZIONE ORARIO DI AGGIORNAMENTO********************/

  /***********CARICAMENTO DATI SUGLI ARRAY DEI GRAFICI E RIORDINO***************/

  putDataTemperature() {
    return this.temperatureDataArraySorted;
  }

  putTemperatureMaxMeteo() {
    return this.temperatureMaxDataArraySorted;
  }

  putTemperatureMinMeteo() {
    return this.temperatureMinDataArraySorted;
  }

  putAirQuality() {
    return this.airQualityDataArraySorted;
  }

  putTotalCases() {
    return this.totalCasesDataArraySorted;
  }

  putDataHumidity() {
    return this.humidityDataArraySorted;
  }
  putDataWind() {
    return this.windDataArraySorted;
  }
  putTotalDeaths() {
    return this.totalDeathsDataArraySorted;
  }
  putTodayDeaths() {
    return this.todayDeathsDataArraySorted;
  }
  putDeathRate() {
    return this.deathRateDataArraySorted;
  }
  putCasesPerMillion() {
    return this.casesPerMillionDataArraySorted;
  }
  /*******************CARICAMENTO DATI SUGLI ARRAY DEI GRAFICI******************/

  /*************************CREAZIONE GRAFICI PANORAMICI************************/

  createMeteoGraph(elementId: string) {
    let myCanvas = document.getElementById(elementId);
    let myLabels = this.europeTranslate;
    const data = this.putDataTemperature();
    let chart = new Chart(myCanvas, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Real-time temperature (in °C)",
          data: data,
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createTotalCasesCovidGraph(elementId: string) {
    let myCanvas1 = document.getElementById(elementId);
    let myLabels = this.europeTranslate;
    const data = this.putTotalCases();
    let chart1 = new Chart(myCanvas1, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Total cases",
          data: data,
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createTotalDeathsCovidGraph(elementId: string) {
    let myCanvas2 = document.getElementById(elementId);
    let myLabels = this.europeTranslate;
    const data = this.putTotalDeaths();
    let chart2 = new Chart(myCanvas2, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Total deaths",
          data: data,
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }
  createHumidityGraph(elementId: string) {
    let myCanvas3 = document.getElementById(elementId);
    let myLabels = this.europeTranslate;
    const data = this.putDataHumidity();
    let chart3 = new Chart(myCanvas3, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Real-time humidity (in %)",
          data: data,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createWindGraph(elementId: string) {
    let myCanvas4 = document.getElementById(elementId);
    let myLabels = this.europeTranslate;
    const data = this.putDataWind();
    let chart4 = new Chart(myCanvas4, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Real-time wind speed (in m/s)",
          data: data,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  /*************************CREAZIONE GRAFICI PANORAMICI************************/

  /*************************SELEZIONE DELLA NAZIONE DA ANALIZZARE***************/
  selectCountryToAnalize(form : NgForm){
    var countryName = form.form.value.country;
    this.isDeadFetching = true;
    this.generateMeteoCountriesCharts(countryName);
    this.generateCovidCountriesCharts(countryName);
  }

  generateMeteoCountriesCharts(countryName: string) {
    this.createTemperatureCountryChart(countryName);
    this.createTemperatureMinCountryChart(countryName);
    this.createTemperatureMaxCountryChart(countryName);
    this.createWindCountryChart(countryName);
    this.createHumidityCountryChart(countryName);
    this.createAirQualityCountryChart(countryName);
  }
  generateCovidCountriesCharts(countryName: string) {
    this.createTotalCasesCountryChart(countryName);
    this.createTodayCasesCountryChart(countryName);
    this.createCasesPerMillionCountryChart(countryName);
    this.createTotalDeathsCountryChart(countryName);
    this.createDeathRateCountryChart(countryName);

  }

  /*************************SELEZIONE DELLA NAZIONE DA ANALIZZARE***************/

  /*************************CREAZIONE GRAFICI NAZIONALI*************************/
  createTemperatureCountryChart(countryName: string) {
    let myCanvas5 = document.getElementById("country-chart-temperature");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.temperatureDataArraySorted[i];
      }
    }
    let chart5 = new Chart(myCanvas5, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Real-time temperature (°C) in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {
        borderWidth: 1
      }
    });
  }

  createTemperatureMinCountryChart(countryName: string) {
    let myCanvas6 = document.getElementById("country-chart-temperature-min");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.temperatureMinDataArraySorted[i];
      }
    }
    let chart6 = new Chart(myCanvas6, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Min. temperature today (°C) in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createTemperatureMaxCountryChart(countryName: string) {
    let myCanvas7 = document.getElementById("country-chart-temperature-max");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.temperatureMaxDataArraySorted[i];

      }
    }
    let chart7 = new Chart(myCanvas7, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Max. temperature today (°C) in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createWindCountryChart(countryName: string) {
    let myCanvas8 = document.getElementById("country-chart-wind");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.windDataArraySorted[i];
      }
    }
    let chart8 = new Chart(myCanvas8, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Wind speed today (m/s) in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createHumidityCountryChart(countryName: string) {
    let myCanvas9 = document.getElementById("country-chart-humidity");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.humidityDataArraySorted[i];

      }
    }
    let chart9 = new Chart(myCanvas9, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Humidity (%) in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createAirQualityCountryChart(countryName: string) {
    let myCanvas10 = document.getElementById("country-chart-air-quality");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.airQualityDataArraySorted[i];

      }
    }
    let chart10 = new Chart(myCanvas10, {
      type: 'bar',
      data: {
        datasets: [{
          label: "AQI (%) in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createTotalCasesCountryChart(countryName: string) {
    let myCanvas11 = document.getElementById("country-chart-total-cases");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.totalCasesDataArraySorted[i];
      }
    }
    let chart11 = new Chart(myCanvas11, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Total cases in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }
  createTodayCasesCountryChart(countryName: string) {
    let myCanvas11 = document.getElementById("country-chart-today-cases");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.todayCasesDataArraySorted[i];
        if (data == 0) {
          this.isAnibodyInjured = false;
        } else {
          this.isAnibodyInjured = true;
        }
      }
    }
    let chart11 = new Chart(myCanvas11, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Cases today in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }

  createTotalDeathsCountryChart(countryName: string) {
    let myCanvas12 = document.getElementById("country-chart-total-deaths");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.totalDeathsDataArraySorted[i];
      }
    }
    let chart12 = new Chart(myCanvas12, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Total deaths in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }
  createTodayDeathsCountryChart(countryName: string) {
    let myCanvas13 = document.getElementById("country-chart-today-deaths");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.todayDeathsDataArraySorted[i];
        if (data == 0) {
          this.isAnibodyDead = false;
        } else {
          this.isAnibodyDead = true;
        }
      }
    }
    let chart13 = new Chart(myCanvas13, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Deaths today in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }
  createCasesPerMillionCountryChart(countryName: string) {
    let myCanvas14 = document.getElementById("country-chart-cases-per-million");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.casesPerMillionDataArraySorted[i];
      }
    }
    let chart14 = new Chart(myCanvas14, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Cases per 1mln of population in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }
  createDeathRateCountryChart(countryName: string) {
    let myCanvas15 = document.getElementById("country-chart-death-rate");
    var data: number;
    for (var i = 0; i < this.europeTranslate.length; i++) {
      if (countryName == this.europeTranslate[i]) {
        data = this.deathRateDataArraySorted[i];
      }
    }
    let chart15 = new Chart(myCanvas15, {
      type: 'bar',
      data: {
        datasets: [{
          label: "Covid deaths' percentage in " + countryName,
          data: [data],
          backgroundColor: "#3C6E71",
          fill: false
        }]
      },
      options: {

      }
    });
  }
/*************************CREAZIONE GRAFICI NAZIONALI*************************/

/*************************CREAZIONE ANALISI NAZIONALI*************************/
createCasesDeathsRatioChart(){
  let myCanvas16 = document.getElementById("death-race-wind-speed-ratio-1");
  let myLabels = this.europeTranslate;
  const dataDeathRate = this.putDeathRate();
  let chart16 = new Chart(myCanvas16, {
    type: 'bar',
    data: {
      labels: myLabels,
      datasets: [{
        label: "Death Rate (%)",
        data: dataDeathRate,
        backgroundColor: '#3C6E71',
        fill: false
      }]
    },
    options: {

    }
  });
}
createWindSpeedRatioChart(){
  let myCanvas17 = document.getElementById("death-race-wind-speed-ratio-2");
  let myLabels = this.europeTranslate;
  const dataWindSpeed = this.putDataWind();
  let chart17 = new Chart(myCanvas17, {
    type: 'bar',
    data: {
      labels: myLabels,
      datasets: [{
        label: "Wind Speed (m/s)",
        data: dataWindSpeed,
        backgroundColor: '#3C6E71',
        fill: false
      }]
    },
    options: {

    }
  });
}
createCasesDeathsRatioChart1(){
  let myCanvas18 = document.getElementById("death-race-humidity-ratio-1");
  let myLabels = this.europeTranslate;
  const dataDeathRate = this.putDeathRate();
  let chart18 = new Chart(myCanvas18, {
    type: 'bar',
    data: {
      labels: myLabels,
      datasets: [{
        label: "Death Rate (%)",
        data: dataDeathRate,
        backgroundColor: '#3C6E71',
        fill: false
      }]
    },
    options: {

    }
  });
}
createHumidityRatioChart(){
let myCanvas19 = document.getElementById("death-race-humidity-ratio-2");
let myLabels = this.europeTranslate;
const humidity = this.putDataHumidity();
let chart19 = new Chart(myCanvas19, {
  type: 'bar',
  data: {
    labels: myLabels,
    datasets: [{
      label: "Humidity (%)",
      data: humidity,
      backgroundColor: '#3C6E71',
      fill: false
    }]
  },
  options: {

  }
});
}
createCasesPopulationRatioChart(){
  let myCanvas20 = document.getElementById("cases-population-death-race-ratio-1");
  let myLabels = this.europeTranslate;
  var ratioArray: number[] = [];
  for (var i = 0; i < this.europeTranslate.length; i++) {
      var value = (this.totalCasesDataArraySorted[i] / this.populationArraySorted[i]);
      ratioArray.push(value);
    }
    let chart20 = new Chart(myCanvas20, {
    type: 'bar',
    data: {
      labels: myLabels,
      datasets: [{
        label: "(Cases / Population)",
        data: ratioArray,
        backgroundColor: '#3C6E71',
        fill: false
      }]
    },
    options: {
  
    }
  });
  }
  createCasesDeathsRatioChart2(){
    let myCanvas21 = document.getElementById("cases-population-death-race-ratio-2");
    let myLabels = this.europeTranslate;
    let data = this.putDeathRate();
    let chart21 = new Chart(myCanvas21, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "(Deaths / Cases)",
          data: data,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }
  createTemperatureRatioChart(){
    let myCanvas22 = document.getElementById("temperature-cases-ratio-1");
    let myLabels = this.europeTranslate;
    const temperature = this.putDataTemperature();
    let chart22 = new Chart(myCanvas22, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Temperature (in °C)",
          data: temperature,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }
  createCasesRatioChart(){
    let myCanvas23 = document.getElementById("temperature-cases-ratio-2");
    let myLabels = this.europeTranslate;
    const totalCases = this.putTotalCases();
    let chart23 = new Chart(myCanvas23, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Total Cases",
          data: totalCases,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }

  createMinTemperatureRatioChart(){
    let myCanvas22 = document.getElementById("min-temperature-cases-ratio-1");
    let myLabels = this.europeTranslate;
    const minTemperature = this.temperatureMinDataArraySorted;
    let chart22 = new Chart(myCanvas22, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Min. Temperature (in °C)",
          data: minTemperature,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }
  createCasesRatioChart1(){
    let myCanvas23 = document.getElementById("min-temperature-cases-ratio-2");
    let myLabels = this.europeTranslate;
    const totalCases = this.putTotalCases();
    let chart23 = new Chart(myCanvas23, 
      {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Total Cases",
          data: totalCases,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }
  createMaxTemperatureRatioChart(){
    let myCanvas24 = document.getElementById("max-temperature-cases-ratio-1");
    let myLabels = this.europeTranslate;
    const maxTemperature = this.temperatureMaxDataArraySorted;
    let chart23 = new Chart(myCanvas24, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Max. Temperature (in °C)",
          data: maxTemperature,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }
  createCasesRatioChart2(){
    let myCanvas25 = document.getElementById("max-temperature-cases-ratio-2");
    let myLabels = this.europeTranslate;
    const totalCases = this.putTotalCases();
    let chart25 = new Chart(myCanvas25, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Total Cases",
          data: totalCases,
          backgroundColor: '#3C6E71',
          fill: false
        }]
      },
      options: {
  
      }
    });
  }
/*************************CREAZIONE ANALISI NAZIONALI*************************/
}