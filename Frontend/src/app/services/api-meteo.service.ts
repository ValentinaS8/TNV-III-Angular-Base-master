import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiMeteo } from '../models/apimeteo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiMeteoService {

  private baseDBURL = 'http://localhost:3000/meteodata';
  private baseApiUrl='https://api.troposphere.io/forecast/41.89193,12.51133?token=';
  private apiKey= '10c9c13c5e265318f48f0d3b78378254d47c18c999d5ee9caa'
  constructor(private http:HttpClient) { 
    
  }
  getMeteoApiData(){
    return this.http.get(this.baseApiUrl+this.apiKey);
  }

  addMeteoEntry = (meteoCountries: ApiMeteo) => {
    return this.http.post<ApiMeteo>(this.baseDBURL, {     
      
      "timezone": meteoCountries.timezone,
      "time": meteoCountries.time,
      "temperature": meteoCountries.temperature,
      "temperatureMax": meteoCountries.temperatureMax,
      "temperaturemin": meteoCountries.temperatureMin,
      "relHumidity": meteoCountries.relHumidity,
      "fatalityRate": meteoCountries.airQualityIndex,
      "airQuality": meteoCountries.airQualityIndex,     
      
    });
  };
}
