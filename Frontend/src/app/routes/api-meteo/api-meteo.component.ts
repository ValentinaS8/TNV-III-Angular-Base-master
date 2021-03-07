import { Component, OnInit } from '@angular/core';
import { ApiMeteoService } from '../../services/api-meteo.service';
@Component({
  selector: 'app-api-meteo',
  templateUrl: './api-meteo.component.html',
  styleUrls: ['./api-meteo.component.css']
})
export class ApiMeteoComponent implements OnInit {

  constructor(private apimeteoService: ApiMeteoService) { }
meteoCountries;
  ngOnInit(): void {
  }
  getMeteoCountries(){
    this.apimeteoService.getMeteoCountries().subscribe(
      meteoData=> {
        this.meteoCountries = meteoData
      },
      err => console.log(err),
      ()=> console.log("miracolo!!!", this.meteoCountries)
            
        );

  }
}
