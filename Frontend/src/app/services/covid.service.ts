//copia da data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCoronaDataSemplified } from '../models/apiCoronaSemplified.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  baseURL = 'http://localhost:3000/dati_covid';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<Array<ApiCoronaDataSemplified>>(this.baseURL)
  }

  getEntry(id) {
    return this.http.get<ApiCoronaDataSemplified>(this.baseURL + "/" + id)
  }

  addEntry = (data: ApiCoronaDataSemplified) => {
    return this.http.post<ApiCoronaDataSemplified>(this.baseURL, {
      //l'id è automatico e autoincrementante, quindi non lo inserisco
      "name": data.country_name,
      "population": data.population,
      "date": data.date,
      "today_deaths": data.today_deaths,
      "today_cases": data.today_cases,
      "total_deaths": data.today_deaths,
      "total_cases": data.total_cases,
      "death_rate": data.death_rate,
      "cases_per_million_people": data.cases_per_million_people
    });
  };
 
  deleteEntry(id) {
    return this.http.delete(this.baseURL + "/" + id)
  }

  editEntry = (data: ApiCoronaDataSemplified) => {
    return this.http.put(this.baseURL + '/' + data.country_name, {
      "name": data.country_name,
      "population": data.population,
      "date": data.date,
      "today_deaths": data.today_deaths,
      "today_cases": data.today_cases,
      "total_deaths": data.today_deaths,
      "total_cases": data.total_cases,
      "death_rate": data.death_rate,
      "cases_per_million_people": data.cases_per_million_people
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