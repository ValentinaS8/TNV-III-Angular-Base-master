import { Calculated } from './../models/apiCorona.model';
//copia da data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCoronaData, LatestData } from '../models/apiCorona.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  baseURL = 'http://localhost:3000/dati_covid';

  constructor(private http: HttpClient) { }

  getCovidData() {
    return this.http.get<Array<ApiCoronaData>>(this.baseURL)
  }

  getCovidEntry(id) {
    return this.http.get<ApiCoronaData>(this.baseURL + "/" + id)
  }

  addCovidEntry = (data: ApiCoronaData) => {
    return this.http.post<ApiCoronaData>(this.baseURL, {
      //l'id è automatico e autoincrementante, quindi non lo inserisco
      "country_name": data.data.name,
      "population": data.data.population,
      "date": data.data.updated_at,
      "today_deaths": data.data.today.deaths,
      "today_cases": data.data.today.confirmed,
      "total_deaths": data.data.latest_data.deaths,
      "total_cases": data.data.latest_data.confirmed,
      "death_rate": data.data.latest_data.calculated.death_rate,
      "cases_per_million_people": data.data.latest_data.calculated.cases_per_million_population
    });
  };

  addCovidPromiseEntry = (data: ApiCoronaData) => {
    return this.http.post<ApiCoronaData>(this.baseURL, {
      //l'id è automatico e autoincrementante, quindi non lo inserisco
      "country_name": data.data.name,
      "population": data.data.population,
      "date": data.data.updated_at,
      "today_deaths": data.data.today.deaths,
      "today_cases": data.data.today.confirmed,
      "total_deaths": data.data.latest_data.deaths,
      "total_cases": data.data.latest_data.confirmed,
      "death_rate": data.data.latest_data.calculated.death_rate,
      "cases_per_million_people": data.data.latest_data.calculated.cases_per_million_population
    }).toPromise();
  };

  deleteEntry(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  editCovidEntry = (data: ApiCoronaData) => {
    return this.http.put(this.baseURL + '/' + data.data.name, {
      "name": data.data.name,
      "population": data.data.population,
      "date": data.data.updated_at,
      "today_deaths": data.data.latest_data.deaths,
      "today_cases": data.data.latest_data.confirmed,
      "total_deaths": data.data.latest_data.deaths,
      "total_cases": data.data.latest_data.confirmed,
      "death_rate": data.data.latest_data.calculated.death_rate,
      "cases_per_million_people": data.data.latest_data.calculated.cases_per_million_population
    });
  };

}

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidData } from '../models/data.model';
import { ApiCoronaData } from '../models/apiCorona.model';
import { ApiCoronaData } from 'src/app/models/apiCorona.model';


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