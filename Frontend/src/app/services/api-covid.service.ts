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

  /*
  europeCountries=["","","Spagna","Francia","Belgio","Paesi Bassi","Lussemburgo",
  "Cipro","Malta","Austria","Germania","Polonia","Danimarca","Svezia","Lettonia","Lituania",
  "Estonia","Regno Unito","Irlanda","Romania","Grecia","Croazia","Slovenia","Ungheria","Repubblica Ceca",
  "Slovacchia","Finlandia"];
  */
  
  getCountryCovidData(countryName : any)
  {
    if (countryName === "Italia") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/IT');
    
    if (countryName === "Portogallo") return this.http.get<ApiCoronaData>(this.baseUrl + '/countries' + '/PT');
    /*if (dataCity === "Berlino") return this.http.get<ApiMeteo>(this.baseApiUrl+this.BerlinoMeteoUrl+this.apiKey);
    if (dataCity === "Bratislava") return this.http.get<ApiMeteo>(this.baseApiUrl+this.BratislavaMeteoUrl+this.apiKey);
    if (dataCity === "Bruxelles") return this.http.get<ApiMeteo>(this.baseApiUrl+this.BruxellesMeteoUrl+this.apiKey);
    if (dataCity === "Bucarest") return this.http.get<ApiMeteo>(this.baseApiUrl+this.BucarestMeteoUrl+this.apiKey);
    if (dataCity === "Budapest") return this.http.get<ApiMeteo>(this.baseApiUrl+this.BudapestMeteoUrl+this.apiKey);
    if (dataCity === "Copenaghen") return this.http.get<ApiMeteo>(this.baseApiUrl+this.CopenaghenMeteoUrl+this.apiKey);
    if (dataCity === "Dublino") return this.http.get<ApiMeteo>(this.baseApiUrl+this.DublinoMeteoUrl+this.apiKey);
    if (dataCity === "Helsinki") return this.http.get<ApiMeteo>(this.baseApiUrl+this.HelsinkiMeteoUrl+this.apiKey);
    if (dataCity === "La Valletta") return this.http.get<ApiMeteo>(this.baseApiUrl+this.VallettaMeteoUrl+this.apiKey);
    if (dataCity === "Lisbona") return this.http.get<ApiMeteo>(this.baseApiUrl+this.LisbonaMeteoUrl+this.apiKey);
    if (dataCity === "Londra") return this.http.get<ApiMeteo>(this.baseApiUrl+this.LondraMeteoUrl+this.apiKey);
    if (dataCity === "Lubiana") return this.http.get<ApiMeteo>(this.baseApiUrl+this.LubianaMeteoUrl+this.apiKey);
    if (dataCity === "Lussemburgo") return this.http.get<ApiMeteo>(this.baseApiUrl+this.LussemburgoMeteoUrl+this.apiKey);
    if (dataCity === "Madrid") return this.http.get<ApiMeteo>(this.baseApiUrl+this.MadridMeteoUrl+this.apiKey);
    if (dataCity === "Nicosia") return this.http.get<ApiMeteo>(this.baseApiUrl+this.NicosiaMeteoUrl+this.apiKey);
    if (dataCity === "Praga") return this.http.get<ApiMeteo>(this.baseApiUrl+this.PragaMeteoUrl+this.apiKey);
    if (dataCity === "Parigi") return this.http.get<ApiMeteo>(this.baseApiUrl+this.ParigiMeteoUrl+this.apiKey);
    if (dataCity === "Riga") return this.http.get<ApiMeteo>(this.baseApiUrl+this.RigaMeteoUrl+this.apiKey);
    if (dataCity === "Roma") return this.http.get<ApiMeteo>(this.baseApiUrl+this.RomaMeteoUrl+this.apiKey);
    if (dataCity === "Stocolma") return this.http.get<ApiMeteo>(this.baseApiUrl+this.StocolmaMeteoUrl+this.apiKey);
    if (dataCity === "Tallinn") return this.http.get<ApiMeteo>(this.baseApiUrl+this.TallinMeteoUrl+this.apiKey);
    if (dataCity === "Varsavia") return this.http.get<ApiMeteo>(this.baseApiUrl+this.VarsaviaMeteoUrl+this.apiKey);
    if (dataCity === "Vienna") return this.http.get<ApiMeteo>(this.baseApiUrl+this.ViennaMeteoUrl+this.apiKey);
    if (dataCity === "Vilnius") return this.http.get<ApiMeteo>(this.baseApiUrl+this.ViniusMeteoUrl+this.apiKey);
    if (dataCity === "Zagabria") return this.http.get<ApiMeteo>(this.baseApiUrl+this.ZagabriaMeteoUrl+this.apiKey);*/
    
  }
  /*creazione chiamata http per la get che interroga l'api per avere i dati di una sola nazione (Afghanistan)*
  getOneCountryData(countryCode : string)
  {
    return this.http.get(this.baseUrl + "'/" + countryCode + "'"); //url che restituisce i dati di tutte le nazioni
  }*/

   

}
