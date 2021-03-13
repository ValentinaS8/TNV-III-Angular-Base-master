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
  
  getCountryCovidData(countryName : any)
  {
    if (countryName === "Italia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/IT'); 
    if (countryName === "Svizzera") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/CH');   
    if (countryName === "Portogallo") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/PT');
    if (countryName === "Spagna") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/ES');
    if (countryName === "Francia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/FR');
    if (countryName === "Belgio") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/BE');
    if (countryName === "Paesi Bassi") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/NL');
    if (countryName === "Lussemburgo") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/LU'); 
    if (countryName === "Cipro") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/CY');
    if (countryName === "Malta") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/MT');
    if (countryName === "Austria") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/AT');
    if (countryName === "Germania") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/DE');
    if (countryName === "Polonia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/PL'); 
    if (countryName === "Danimarca") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/DK');
    if (countryName === "Svezia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/SE');
    if (countryName === "Lettonia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/LV');
    if (countryName === "Lituania") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/LT');
    if (countryName === "Estonia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/EE');
    if (countryName === "Regno Unito") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/GB');
    if (countryName === "Irlanda") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/IE');
    if (countryName === "Romania") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/RO');
    if (countryName === "Grecia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/GR');
    if (countryName === "Croazia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/HR');
    if (countryName === "Slovenia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/SI');
    if (countryName === "Ungheria") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/HU');
    if (countryName === "Repubblica Ceca") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/CZ');
    if (countryName === "Slovacchia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/SK');
    if (countryName === "Finlandia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/FI');    
  }
  /*creazione chiamata http per la get che interroga l'api per avere i dati di una sola nazione (Afghanistan)*
  getOneCountryData(countryCode : string)
  {
    return this.http.get(this.baseUrl + "'/" + countryCode + "'"); //url che restituisce i dati di tutte le nazioni
  }*/

   

}
