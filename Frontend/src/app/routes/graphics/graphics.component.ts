import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiMeteo } from 'src/app/models/apimeteo.model';
import { ApiMeteoService } from 'src/app/services/api-meteo.service';
import { ApiCovidService } from '../../services/api-covid.service';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';



@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  dataCity: any;
  meteoCountries: ApiMeteo;
  meteoDataArray: any;

  constructor(private apimeteoService: ApiMeteoService) { }

  europe = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria"];

  ngOnInit(): void {
    this.dataCity = "Austria";
    console.log(this.apimeteoService.getMeteoApiData(this.dataCity));
  }



  //Crea il grafico
  createMeteoGraph() {
    let myCanvas = document.getElementById("meteo-grafico1");
    let myLabels = this.europe;
    const data = this.putDataMeteo();
    console.log(data);

    let chart = new Chart(myCanvas, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Temperature registrate",
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

  //Prende l'array di dati dal Servizio Meteo e lo pusha nell'array del grafico
  putDataMeteo() {
    const dataMeteo = [];
    dataMeteo.push();
    console.log(dataMeteo);
    return dataMeteo;
  }

  //Prende l'array di dati dal Servizio Covid e lo pusha nell'array del grafico
  putDataCovid() {

    const dataCovid = [];
    dataCovid.push();
    console.log(dataCovid);
    return dataCovid;
  }
}