import { ApiMeteo } from './../../models/apimeteo.model';
import { Component, OnInit } from '@angular/core';
import { ApiMeteoService } from '../../services/api-meteo.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-api-meteo',
  templateUrl: './api-meteo.component.html',
  styleUrls: ['./api-meteo.component.css']
})
export class ApiMeteoComponent implements OnInit {

  constructor(private apimeteoService: ApiMeteoService) { }

meteoCountries : ApiMeteo;

  ngOnInit(): void {
  }

  getMeteoApiData(){
    this.apimeteoService.getMeteoApiData().subscribe((meteoData : ApiMeteo) =>
      {
        this.meteoCountries = meteoData
        console.log(this.meteoCountries.time)
      },
      err => console.log(err),
      ()=> console.log("miracolo!!!", this.meteoCountries)
            
        );

  }

  postMeteoApiData(meteoCountries : ApiMeteo){
    this.meteoCountries;
    console.log(meteoCountries.airQualityIndex)  

    this.apimeteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
      console.log(response);
      },
    (err) => {
      //fai qualcosa
    }
    )
  }
}
