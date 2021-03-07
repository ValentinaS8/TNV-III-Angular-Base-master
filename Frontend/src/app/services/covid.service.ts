//copia da data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCoronaData } from '../models/apiCorona.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  baseURL = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<Array<ApiCoronaData>>(this.baseURL)
  }

  getEntry(id) {
    return this.http.get<ApiCoronaData>(this.baseURL + "/" + id)
  }

  addEntry = (data: ApiCoronaData) => {
    return this.http.post<ApiCoronaData>(this.baseURL, {
      //l'id è automatico e autoincrementante, quindi non lo inserisco
      "nome_stato": data.data.name,
      "data": data.data.updated_at,
      "popolazione": data.data.population,
      "morti_giornaliere": data.data.today.deaths,
      "casi_giornalieri": data.data.today.confirmed,
      "morti_totali": data.data.latest_data.deaths,
      "casi_totali": data.data.latest_data.confirmed,
      "percentuale_morti": data.data.latest_data.calculated.death_rate,
      "casi_su_un_milione_di_abitanti": data.data.latest_data.calculated.cases_per_million_population
    });
  };

  deleteEntry(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  editEntry = (data: ApiCoronaData) => {
    return this.http.put(this.baseURL + '/' + data.data.name, {
      "nome_stato": data.data.name,
      "data": data.data.updated_at,
      "popolazione": data.data.population,
      "morti_giornaliere": data.data.today.deaths,
      "casi_giornalieri": data.data.today.confirmed,
      "morti_totali": data.data.latest_data.deaths,
      "casi_totali": data.data.latest_data.confirmed,
      "percentuale_morti": data.data.latest_data.calculated.death_rate,
      "casi_su_un_milione_di_abitanti": data.data.latest_data.calculated.cases_per_million_population
    });
  };

}

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidData } from '../models/data.model';
import { ApiCoronaData } from '../models/apiCorona.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'http://localhost:3000/data';

  constructor( private http : HttpClient) { }

  getData () {
    return this.http.get<Array<CovidData>>(this.baseURL)
  }

  getEntry( id ) {
    return this.http.get<CovidData>(this.baseURL + "/" + id)
  }

  addEntry = (data: CovidData) => {
    return this.http.post<CovidData>(this.baseURL, {
      "country": data.country,
      "population": data.population,
      "cases": data.cases,
      "deaths": data.deaths,
      "recoveries": data.recoveries,
      "recoveryRate": data.recoveryRate,
      "fatalityRate": data.fatalityRate,
      "continent": data.continent,
      "classification": data.classification,
      "date": data.date
    });
  };

  deleteEntry( id ){
    return this.http.delete(this.baseURL + "/" + id)
  }

  editEntry = (data: CovidData) => {
    return this.http.put(this.baseURL + '/' + data.id, {
      "id": data.id,
      "country": data.country,
      "population": data.population,
      "cases": data.cases,
      "deaths": data.deaths,
      "recoveries": data.recoveries,
      "recoveryRate": data.recoveryRate,
      "fatalityRate": data.fatalityRate,
      "continent": data.continent,
      "classification": data.classification,
      "date": data.date
    });
  };

}

*/