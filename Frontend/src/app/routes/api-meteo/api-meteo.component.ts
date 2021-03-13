import { ApiMeteo } from './../../models/apimeteo.model';
import { Component, OnInit } from '@angular/core';
import { ApiMeteoService } from '../../services/api-meteo.service';
import { Router } from '@angular/router';
import { NgSelectOption, NgForm } from '@angular/forms';
import { MeteoService } from '../../services/meteo.service';



@Component({
  selector: 'app-api-meteo',
  templateUrl: './api-meteo.component.html',
  styleUrls: ['./api-meteo.component.css']
})
export class ApiMeteoComponent implements OnInit {

  constructor(private apimeteoService: ApiMeteoService, private meteoService: MeteoService, private router: Router) { }
  dataCity: string;
  europe = ["Amsterdam", "Atene", "Berlino", "Bratislava", "Bruxelles", "Bucarest", "Budapest", "Copenaghen", "Dublino", "Helsinki", "La Valletta", "Lisbona", "Londra", "Lubiana", "Lussemburgo", "Madrid", "Nicosia", "Parigi", "Praga", "Riga", "Roma", "Stocolma", "Tallinn", "Varsavia", "Vienna", "Vilnius", "Zagabria",];
  meteoCountries: ApiMeteo;
  meteoDataArray: Array<ApiMeteo> = [];

  ngOnInit(): void {
  }

  getMeteoApiData(form: NgForm) {
    this.dataCity = form.form.value.city
    console.log(this.dataCity);
    this.apimeteoService.getMeteoApiData(this.dataCity).subscribe((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      //scrittura a db
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
        console.log(response);
      },
        err => console.log("Esaurimento Nervoso In Arrivo")
              )
    },
      err => console.log(err),
      () => console.log("miracolo!!!", this.meteoCountries)

    );

  }
  // funzione da inserire all'interno della getMetteo al fine di fare tutto in un unico passo
  postMeteoApiData(meteoCountries: ApiMeteo) {
    this.meteoCountries;
    console.log(meteoCountries.data.current.airQualityIndex)

    this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
      console.log(response);
    },

      err => console.log("Esaurimento Nervoso In Arrivo")

    )
  }
}
