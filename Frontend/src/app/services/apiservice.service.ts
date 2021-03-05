import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCountry } from '../models/apicountry.model';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
 
  private baseUrl = 'https://corona-api.com/';
  constructor(private http:HttpClient) { 

  }

  getCountries(){
    return this.http.get<ApiCountry>(this.baseUrl+'/countries');
  }

  getAfghanistanData(){
    return this.http.get<ApiCountry>(this.baseUrl+'/countries'+'/AF');
  }

}
