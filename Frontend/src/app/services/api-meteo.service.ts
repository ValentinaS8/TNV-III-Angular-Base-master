import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMeteoService {

  private baseUrl='https://api.troposphere.io/forecast/41.89193,12.51133?token=10c9c13c5e265318f48f0d3b78378254d47c18c999d5ee9caa';
  constructor(private http:HttpClient) { 
    
  }
  getMeteoCountries(){
    return this.http.get(this.baseUrl);
  }
}
