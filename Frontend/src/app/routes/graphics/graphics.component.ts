import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiMeteo } from 'src/app/models/apimeteo.model';
import { ApiMeteoService } from 'src/app/services/api-meteo.service';



@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {


  constructor(private apimeteoService: ApiMeteoService) { }
  europe = ["Amsterdam", "Atene", "Berlino", "Bratislava", "Bruxelles", "Bucarest", "Budapest", "Copenaghen", "Dublino", "Helsinki", "La Valletta", "Lisbona", "Londra", "Lubiana", "Lussemburgo", "Madrid", "Nicosia", "Parigi", "Praga", "Riga", "Roma", "Stoccolma", "Tallinn", "Varsavia", "Vienna", "Vilnius", "Zagabria",];
  romeTemperature: number;

  ngOnInit(): void {
    /*
    this.getMeteoApiData();
    this.getCovidApiData();
    */
  }
/*
  getMeteoApiData() {
    this.apimeteoService.getMeteoApiData().subscribe((meteoData: ApiMeteo) => {
      this.romeTemperature = meteoData.data.current.temperature;
      this.createMeteoGraph();
    },
      err => console.log(err),
      () => console.log("Dato ottenuto: (C°)", this.romeTemperature)

    );
  }

  getCovidApiData() {
    //TODO: Sviluppare GET in base al Service di Valentina (Covid Data)
    this.apimeteoService.getMeteoApiData().subscribe((meteoData: ApiMeteo) => {
      this.romeTemperature = meteoData.data.current.temperature;
      this.createCovidGraph();
    },
      err => console.log(err),
      () => console.log("", this.romeTemperature)

    );
  }
*/
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

  createCovidGraph(){
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
          data: data.dataCovid,
          backgroundColor: 'red',
          fill: false
        }]
      },
      options: {

      }
    });
  }

  putDataMeteo(){
    //TODO: Ciclare ALL GET temperature di tutte le città
    const dataMeteo = [];
    dataMeteo.push(this.romeTemperature);
    console.log(dataMeteo);
    return dataMeteo;
  }

  putDataCovid(){
    //TODO: Ciclare ALL GET casi di tutte le città
    const dataCovid = [];
    dataCovid.push();
    console.log(dataCovid);
    return {dataCovid};
  }
}