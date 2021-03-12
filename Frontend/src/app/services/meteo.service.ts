import { ApiMeteoService } from './api-meteo.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ApiMeteo } from '../models/apimeteo.model';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  baseURL = 'http://localhost:3000/meteodata';

  constructor(private http: HttpClient) { }

  getMeteoData(){
    return this.http.get<Array<ApiMeteo>>(this.baseURL)
  }

  getMeteoEntry(id){
    return this.http.get<ApiMeteo>(this.baseURL + "/" + id)
  }

  addMeteoEntry = (meteoCountries: ApiMeteo) => {
    console.log("sono in addEntry", meteoCountries.data.current.relHumidity)
    return this.http.post<ApiMeteo>(this.baseURL, {     
      
      "timezone": meteoCountries.data.timezone,
      
      "temperature": meteoCountries.data.current.temperature,
      "temperatureMax": meteoCountries.data.current.temperatureMax,
      "temperatureMin": meteoCountries.data.current.temperatureMin,
      "relHumidity": meteoCountries.data.current.relHumidity,
      "airQualityIndex": meteoCountries.data.current.airQualityIndex,     
      
    });
  };

  deleteEntry(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  editCovidEntry = (meteoCountries: ApiMeteo) => {
    return this.http.put(this.baseURL + '/' + meteoCountries.data.timezone, {
      "timezone": meteoCountries.data.timezone,
    
      "temperature": meteoCountries.data.current.temperature,
      "temperatureMax": meteoCountries.data.current.temperatureMax,
      "temperatureMin": meteoCountries.data.current.temperatureMin,
      "relHumidity": meteoCountries.data.current.relHumidity,
      "airQualityIndex": meteoCountries.data.current.airQualityIndex,
    });
  };


}
