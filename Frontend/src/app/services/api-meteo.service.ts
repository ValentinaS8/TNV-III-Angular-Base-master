import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMeteoService {

  private baseUrl='https://www.metaweather.com/api/location/';
  constructor(private http:HttpClient) { 
    
  }
  getMeteoCountries(){
    return this.http.get(this.baseUrl+'44418');
  }
}
