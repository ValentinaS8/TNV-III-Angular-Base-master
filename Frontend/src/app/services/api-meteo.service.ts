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


  private apiKeyArray = ["1528457b8a1b25fa91a4095ac4c28cdfa372ada50a874eb8d0",
    "0907bb713fa3fa06b4efeae57e7a89d8eb8f6359e5bcddacb5",
    "5945dcd40c78b0459ec9e4dc4d75a61f03e0c25b2758e2d688",
    "b817c1d9d29eac010eeea7c24b83e1edb376b55c315538ff6e",
    "82c0e1442074568c58e1365ed5006cde80a73cb113a86fa66d",
    "8649d048186ae8c9ac86af04aeaaf862463fdcb21e8f7902ca",
    "54253d199bf607701864f5216ca4ad20eac1d59aab961cab25",
    "74f7e28d0d85d137a762771cd45669c7c2e9c509b441584167",
    "4e68b676d30290002dcbbf27286c9120619612e590d098cc2c",
    "26faf035fea25690d4d2047639201f44059f53f75e3e69d3dd",
    "a8832a74c21279a93f2ba4ae40f1fd42c7a77a816f71280c2a",
    "cbcc76fa88af43f4efa18cffb504c04acdfde718aedb27dbfa",
    "7950b391e63d29d8bf53b10129debf700bfde5983c907b0f4f",
    "842361ef6f6841bc4295200725e2df653d9d48dd9cfb9ac06a",
    "ca5b260a5c038e605e37bbdba7336bff87e23a95ea07a3506b",
    "0afe6bc4db21aa6c66480cca12917f4f0fed2641387587435e",
    "067c92359ad9716a69e3e224ddc04573d2b0a6d013f4aea7a0",
    "c7f2a91674b8e7a58c23174632d95b2c9f642a838d76438620",
    "65a5e93270768f840cfd2d880d0cab57d3cd01578545d543c1",
    "e0c53936f80bad429670bbf0636be155cacee983c01fea0551",
    "7293a7ad5b4197152e731675bf9aad6638e3e060604ef8ed1a",
    "8d91a29ddf42146a8fb77786241479e329bda02d74833fa695",
    "7ef3b77dcf1df750c0f747a3b1f569bc1f6a0ebefd949627aa",
    "9006675a7b51f835eccde9e5be6cc7cc5f196f88a1c742e75f",
    "9f65b9b5f044cce1f05b4d09aa732954a5fb08750afb4a88c6",
    "8fbb7da9ff90741636a786e6eab0e6318b241e328c51fe4443",
    "4eceabf0e4bc697c77a5f745544bc4c9a05e9765789aecd7ff",
    "3bfdba30eb097650fe4dfc0a4ab56657e4f5065ffa1d70ad02"];

  private apiKey = '?token=29b3617a548c707cb78ff96ac845257fea3cc43fd4f7d51c65';
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
