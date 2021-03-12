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
    this.getMeteoApiData();
  }

  getMeteoApiData() {
    this.apimeteoService.getMeteoApiData().subscribe((meteoData: ApiMeteo) => {
      this.romeTemperature = meteoData.data.current.temperature;
      this.createGraph();
    },
      err => console.log(err),
      () => console.log("miracolo!!!", this.romeTemperature)

    );
  }

  createGraph() {
    let myCanvas = document.getElementById("myCanvas");
    let myCanvas1 = document.getElementById("myCanvas1");
    let myLabels = this.europe;
    const data = this.putData();
    console.log(data);

    let chart = new Chart(myCanvas, {
      type: 'bar',
      data: {
        labels: myLabels,
        datasets: [{
          label: "Temperature registrate",
          data: data.dataMeteo,
          backgroundColor: 'blue',
          fill: false
        }]
      },
      options: {

      }
    });
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

  putData(){
    const dataMeteo = [];
    const dataCovid = [];
    dataMeteo.push(this.romeTemperature);
    console.log(dataMeteo);
    return {dataMeteo, dataCovid};
  }
}