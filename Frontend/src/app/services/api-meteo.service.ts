import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiMeteo } from '../models/apimeteo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiMeteoService {

  // private baseDBURL = 'http://localhost:3000/meteodata';
  private baseApiUrl = 'https://api.troposphere.io/forecast/';

  private AmsterdamMeteoUrl = '52.374,4.88969';
  private AteneMeteoUrl = '37.98376,23.72784';
  private BerlinoMeteoUrl = '52.52437,13.41053';
  private BernaMeteoUrl = '46.94808,7.44744'
  private BratislavaMeteoUrl = '48.14816,17.10674';
  private BruxellesMeteoUrl = '50.85344,4.34878';
  private BucarestMeteoUrl = '44.43225,26.10626';
  private BudapestMeteoUrl = '47.498335,19.04045';
  private CopenaghenMeteoUrl = '55.67594,12.56553';
  private DublinoMeteoUrl = '53.33306,-6.24889';
  private HelsinkiMeteoUrl = '60.16952,24.93545';
  private VallettaMeteoUrl = '35.89968,14.5148';
  private LisbonaMeteoUrl = '38.71667,-9.133';
  private LondraMeteoUrl = '51.50853,-0.12574';
  private LubianaMeteoUrl = '46.05108,14.50513';
  private LussemburgoMeteoUrl = '49.61167,6.13';
  private MadridMeteoUrl = '40.4165,-3.70256';
  private NicosiaMeteoUrl = '35.17531,33.3642';
  private ParigiMeteoUrl = '48.85341,2.3488';
  private PragaMeteoUrl = '50.08804,14.42076';
  private RigaMeteoUrl = '56.946,24.10589';
  private RomaMeteoUrl = '41.89193,12.51133';
  private StocolmaMeteoUrl = '59.32938,18.06871';
  private TallinMeteoUrl = '59.43696,24.75353';
  private VarsaviaMeteoUrl = '52.22977,21.01178';
  private ViennaMeteoUrl = '48.20849,16.37208';
  private ViniusMeteoUrl = '54.68916,25.2798';
  private ZagabriaMeteoUrl = '45.81444,15.9798';


  private apiKey = '?token=f19bef232249628a0c50f16cfd349d603200210fcda08eff42';
  constructor(private http: HttpClient) {

  }
  getMeteoApiData(dataCity: any) {
    console.log(dataCity)

    if (dataCity === "Paesi Bassi") return this.http.get<ApiMeteo>(this.baseApiUrl + this.AmsterdamMeteoUrl + this.apiKey);
    if (dataCity === "Grecia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.AteneMeteoUrl + this.apiKey);
    if (dataCity === "Germania") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BerlinoMeteoUrl + this.apiKey);
    if (dataCity === "Slovacchia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BratislavaMeteoUrl + this.apiKey);
    if (dataCity === "Belgio") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BruxellesMeteoUrl + this.apiKey);
    if (dataCity === "Romania") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BucarestMeteoUrl + this.apiKey);
    if (dataCity === "Ungheria") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BudapestMeteoUrl + this.apiKey);
    if (dataCity === "Danimarca") return this.http.get<ApiMeteo>(this.baseApiUrl + this.CopenaghenMeteoUrl + this.apiKey);
    if (dataCity === "Irlanda") return this.http.get<ApiMeteo>(this.baseApiUrl + this.DublinoMeteoUrl + this.apiKey);
    if (dataCity === "Finlandia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.HelsinkiMeteoUrl + this.apiKey);
    if (dataCity === "Malta") return this.http.get<ApiMeteo>(this.baseApiUrl + this.VallettaMeteoUrl + this.apiKey);
    if (dataCity === "Portogallo") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LisbonaMeteoUrl + this.apiKey);
    if (dataCity === "Regno Unito") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LondraMeteoUrl + this.apiKey);
    if (dataCity === "Slovenia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LubianaMeteoUrl + this.apiKey);
    if (dataCity === "Lussemburgo") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LussemburgoMeteoUrl + this.apiKey);
    if (dataCity === "Spagna") return this.http.get<ApiMeteo>(this.baseApiUrl + this.MadridMeteoUrl + this.apiKey);
    if (dataCity === "Cipro") return this.http.get<ApiMeteo>(this.baseApiUrl + this.NicosiaMeteoUrl + this.apiKey);
    if (dataCity === "Repubblica Ceca") return this.http.get<ApiMeteo>(this.baseApiUrl + this.PragaMeteoUrl + this.apiKey);
    if (dataCity === "Francia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ParigiMeteoUrl + this.apiKey);
    if (dataCity === "Lettonia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.RigaMeteoUrl + this.apiKey);
    if (dataCity === "Italia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.RomaMeteoUrl + this.apiKey);
    if (dataCity === "Svezia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.StocolmaMeteoUrl + this.apiKey);
    if (dataCity === "Estonia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.TallinMeteoUrl + this.apiKey);
    if (dataCity === "Polonia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.VarsaviaMeteoUrl + this.apiKey);
    if (dataCity === "Austria") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ViennaMeteoUrl + this.apiKey);
    if (dataCity === "Lituania") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ViniusMeteoUrl + this.apiKey);
    if (dataCity === "Svizzera") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BernaMeteoUrl + this.apiKey);
    if (dataCity === "Croazia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ZagabriaMeteoUrl + this.apiKey);
  }

  getMeteoPromiseData(dataCity: string) {
    console.log(dataCity)

    if (dataCity === "Paesi Bassi") return this.http.get<ApiMeteo>(this.baseApiUrl + this.AmsterdamMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Grecia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.AteneMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Germania") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BerlinoMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Slovacchia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BratislavaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Belgio") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BruxellesMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Romania") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BucarestMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Ungheria") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BudapestMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Danimarca") return this.http.get<ApiMeteo>(this.baseApiUrl + this.CopenaghenMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Irlanda") return this.http.get<ApiMeteo>(this.baseApiUrl + this.DublinoMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Finlandia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.HelsinkiMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Malta") return this.http.get<ApiMeteo>(this.baseApiUrl + this.VallettaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Portogallo") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LisbonaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Regno Unito") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LondraMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Slovenia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LubianaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Lussemburgo") return this.http.get<ApiMeteo>(this.baseApiUrl + this.LussemburgoMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Spagna") return this.http.get<ApiMeteo>(this.baseApiUrl + this.MadridMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Cipro") return this.http.get<ApiMeteo>(this.baseApiUrl + this.NicosiaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Repubblica Ceca") return this.http.get<ApiMeteo>(this.baseApiUrl + this.PragaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Francia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ParigiMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Lettonia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.RigaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Italia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.RomaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Svezia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.StocolmaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Estonia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.TallinMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Polonia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.VarsaviaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Austria") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ViennaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Lituania") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ViniusMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Svizzera") return this.http.get<ApiMeteo>(this.baseApiUrl + this.BernaMeteoUrl + this.apiKey).toPromise();
    if (dataCity === "Croazia") return this.http.get<ApiMeteo>(this.baseApiUrl + this.ZagabriaMeteoUrl + this.apiKey).toPromise();
  }
}
