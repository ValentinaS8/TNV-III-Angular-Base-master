import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiMeteo } from '../models/apimeteo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiMeteoService {

  private baseDBURL = 'http://localhost:3000/meteodata';
  private baseApiUrl='https://api.troposphere.io/forecast/';

  private AmsterdamMeteoUrl='52.374,4.88969';
  private AteneMeteoUrl='37.98376,23.72784';
  private BerlinoMeteoUrl='52.52437,13.41053';
  private BratislavaMeteoUrl='48.14816,17.10674';
  private BruxellesMeteoUrl='50.85344,4.34878';
  private BucarestMeteoUrl='44.43225,26.10626';
  private BudapestMeteoUrl='47.498335,19.04045';
  private CopenaghenMeteoUrl='55.67594,12.56553';
  private DublinoMeteoUrl='53.33306,-6.24889';
  private HelsinkiMeteoUrl='60.16952,24.93545';
  private VallettaMeteoUrl='35.89968,14.5148';
  private LisbonaMeteoUrl='38.71667,-9.133';
  private LondraMeteoUrl='51.50853,-0.12574';
  private LubianaMeteoUrl='46.05108,14.50513';
  private LussemburgoMeteoUrl='49.61167,6.13';
  private MadridMeteoUrl='40.4165,-3.70256';
  private NicosiaMeteoUrl='35.17531,33.3642';
  private ParigiMeteoUrl='48.85341,2.3488';
  private PragaMeteoUrl='50.08804,14.42076';
  private RigaMeteoUrl='56.946,24.10589';
  private RomaMeteoUrl='41.89193,12.51133';
  private StocolmaMeteoUrl='59.32938,18.06871';
  private TallinMeteoUrl='59.43696,24.75353';
  private VarsaviaMeteoUrl='52.22977,21.01178';
  private ViennaMeteoUrl='48.20849,16.37208';
  private ViniusMeteoUrl='54.68916,25.2798';
  private ZagabriaMeteoUrl='45.81444,15.9798';
  

  private apiKey= '?token=10c9c13c5e265318f48f0d3b78378254d47c18c999d5ee9caa';
  constructor(private http:HttpClient) { 
    
  }
  getMeteoApiData(dataCity : any){
    console.log (dataCity)
    
    if (dataCity === "Amsterdam") return this.http.get<ApiMeteo>(this.baseApiUrl+this.AmsterdamMeteoUrl+this.apiKey);
    if (dataCity === "Atene") return this.http.get<ApiMeteo>(this.baseApiUrl+this.AteneMeteoUrl+this.apiKey);
    if (dataCity === "Berlino") return this.http.get<ApiMeteo>(this.baseApiUrl+this.BerlinoMeteoUrl+this.apiKey);
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
    if (dataCity === "Zagabria") return this.http.get<ApiMeteo>(this.baseApiUrl+this.ZagabriaMeteoUrl+this.apiKey);
  }

  addMeteoEntry = (meteoCountries: ApiMeteo) => {
    return this.http.post<ApiMeteo>(this.baseDBURL, {     
      
      "timezone": meteoCountries.data.timezone,
      "time": meteoCountries.data.current.time,
      "temperature": meteoCountries.data.current.temperature,
      "temperatureMax": meteoCountries.data.current.temperatureMax,
      "temperaturemin": meteoCountries.data.current.temperatureMin,
      "relHumidity": meteoCountries.data.current.relHumidity,
      "airQuality": meteoCountries.data.current.airQualityIndex,     
      
    });
  };
}
