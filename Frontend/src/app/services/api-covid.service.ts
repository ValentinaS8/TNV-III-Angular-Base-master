import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCoronaData } from '../models/apiCorona.model';


@Injectable({
  providedIn: 'root'
})
export class ApiCovidService {

  private baseUrl = 'https://corona-api.com/';
  private countryCode : string;

  constructor( private http : HttpClient) //iniezione del modulo http per usare i suoi metodi get
  { }

  /*creazione chiamata http per la get che interroga l'api per avere i dati di tutte le nazioni*/
  getCountriesData()
  {
    return this.http.get<ApiCoronaData>(this.baseUrl + '/countries'); //url che restituisce i dati di tutte le nazioni
  }

  /*creazione chiamata http per la get che interroga l'api per avere i dati di una sola nazione (Afghanistan)*/
  getAfghanistanData()
  {
    return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/AF'); //url che restituisce i dati dell'Afghanistan
  }
  
  /*creazione chiamata http per la get che interroga l'api per avere i dati di una sola nazione (Afghanistan)*
  getOneCountryData(countryCode : string)
  {
    return this.http.get(this.baseUrl + "'/" + countryCode + "'"); //url che restituisce i dati di tutte le nazioni
  }*/

   

}
