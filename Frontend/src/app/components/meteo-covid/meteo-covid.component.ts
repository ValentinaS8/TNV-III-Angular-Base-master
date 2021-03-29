import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCoronaData } from 'src/app/models/apiCorona.model';
import { ApiCovidService } from 'src/app/services/api-covid.service';
import { CovidService } from 'src/app/services/covid.service';
import { ApiMeteoService } from '../../services/api-meteo.service';
import { MeteoService } from '../../services/meteo.service';
import { ApiMeteo } from '../../models/apimeteo.model';
import { MeteoCovid } from '../../models/meteoCovid.model';
import { Person } from '../../models/person.model';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-meteo-covid',
  templateUrl: './meteo-covid.component.html',
  styleUrls: ['./meteo-covid.component.css']
})
export class MeteoCovidComponent implements OnInit {

  constructor(private router: Router, private covidService: CovidService, private apiCovidService: ApiCovidService,
    private apimeteoService: ApiMeteoService, private meteoService: MeteoService) { }

  ngOnInit(): void {
  }


  covidCountriesData: ApiCoronaData;
  covidCountriesDataArray: Array<ApiCoronaData> = [];
  afghanistanData: ApiCoronaData;
  afghanistanDataArray: Array<ApiCoronaData> = [];
  countryName: string;
  europeCountries: Array<string> = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria",];

  dataCity: string;

  meteoCountries: ApiMeteo;

  meteoDataArray: Array<ApiMeteo> = [];


  /********************parte covid************************************/
  //funzione per il recupero dei dati METEO + COVID di tutte le nazioni

  getAllData() {
    for (let i = 0; i < (this.europeCountries).length; i++) {
      this.getCountryCovidDataFromArray(this.europeCountries[i])
    }
  }

  getAllMeteoApiData(nation) {
    this.dataCity = nation
    console.log(this.dataCity);
    this.apimeteoService.getMeteoPromiseData(this.dataCity).then((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
        console.log(response);
      },
        err => console.log("Errore")
      )
    },
      err => console.log(err),
    );
  }

  getCountryCovidDataFromArray(countryName: string) {
    this.apiCovidService.getCovidPromiseData(countryName).then((data: ApiCoronaData) => {
      this.covidCountriesData = data;
      this.dataCity = countryName
      console.log(this.dataCity);
      this.apimeteoService.getMeteoPromiseData(this.dataCity).then((meteoData: ApiMeteo) => {
        this.meteoCountries = meteoData
        this.meteoDataArray.push(this.meteoCountries)
        console.log(this.meteoCountries.data.current.temperatureMin)
        this.meteoService.addMeteoPromiseEntry(this.meteoCountries).then(response => {
          console.log(response);
        },
          err => console.log("Errore")
        )
      },
        err => console.log(err),
      );

      /*Estrapolazione del valore "Data" dal file .json*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);
      this.covidService.addCovidPromiseEntry(this.covidCountriesData).then(response => {
        console.log("Ho inviato i dati al db", response)
      }
      )
    },
      err => console.log(err),

    )
  }

  // chiamata sincronizzata dei dati covid e dei dati meteo per ogni singola nazione
  getCovidMeteoApiData(form: NgForm) {
    this.getCountryMeteoCovidDataFromForm(form);
    this.getMeteoApiData(form);

  }

  // dati covid per ogni singola nazione
  getCountryMeteoCovidDataFromForm(form: NgForm) {
    this.countryName = form.form.value.country;
    console.log(this.countryName);
    this.apiCovidService.getCountryCovidData(this.countryName).subscribe((data: ApiCoronaData) => {
      this.covidCountriesData = data;

      /*Estrapolazione del valore "Data" dal file .json*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);
      this.covidService.addCovidEntry(this.covidCountriesData).subscribe(response => {
        console.log("Ho inviato i dati al db")
      }
      )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData.data.latest_data)
    )
  }

  /********************parte meteo************************************/


  //funzione per il recupero dei dati METEO deolla nazione scelta attraverso il form 
  getMeteoApiData(form: NgForm) {

    this.dataCity = form.form.value.country
    console.log(this.dataCity);
    this.apimeteoService.getMeteoApiData(this.dataCity).subscribe((meteoData: ApiMeteo) => {
      this.meteoCountries = meteoData
      this.meteoDataArray.push(this.meteoCountries)
      console.log(this.meteoCountries.data.current.temperatureMin)
      //scrittura a db
      this.meteoService.addMeteoEntry(this.meteoCountries).subscribe(response => {
        console.log(response);
      },
        err => console.log("Errore")
      )
    },
      err => console.log(err),
      () => console.log("Loading completed", this.meteoCountries)

    );

  }

  //funzione che fa il merge dei 2 array
  mergeArrays() {
    let i = 0;
    let newArray: Array<any> = [];
    //let arrayLength = this.covidCountriesDataArray.length;
    console.log("SONO ENTRATO NELLA MERGE");
    console.log("Nome stato:", this.covidCountriesDataArray[i].data.name);
   
    for (let item in this.covidCountriesDataArray) {
      console.log("SONO ENTRATO NEL FOR");
      //newArray[i] = Object.assign(this.covidCountriesDataArray[i],this.meteoDataArray[i]);  
      let newObject = Object.assign(this.covidCountriesDataArray[i],this.meteoDataArray[i])
      newArray[i].push(newObject);  
      console.log("HO SCRITTO QUESTO:");
      console.log("Merge", newArray[i]);
      i++;
    }


    /*  let solution: ApiCoronaData;
      let obj;
      for (let item in this.covidCountriesDataArray)    
      {
        //Object.assign(target, ...sources)
        solution = Object.assign(obj, this.meteoDataArray[i]);
        this.covidCountriesDataArray.concat(obj);
        i++;
        console.log("Merge", this.covidCountriesDataArray[i]);

         covidCountriesDataArray: Array<ApiCoronaData> = [];
  
  meteoDataArray: Array<ApiMeteo> = [];
      }*/
   
  }

  merge2() {
    
    let person : Array<Person> = [{
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      ssn: '123-456-2356',
      contact: {
        phone: '408-989-8745',
        email: 'john.doe@example.com'
      }
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      ssn: '123-456-2356',
      contact: {
        phone: '408-989-8745',
        email: 'john.doe@example.com'
      }
    }
  ]   

  let job : Array <Job> = [{
    jobTitle: 'JavaScript Developer',
    location: 'USA'
  },
  {
    jobTitle: 'prova',
    location: 'prova'
  }];

  let employee : Array<any> = [];

  let i=0;

  for(let p in person)
  {
    employee [i] = Object.assign(person[i], job[i]);
    console.log("Risultato:", employee);
    i++;
  }  

    employee = Object.assign(person, job);
    //let employee = { ...person, ...job };

    //console.log(employee.contact === person.contact);
    console.log("Risultato:", employee);

    /*{
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      ssn: '123-456-2356',
      contact: {
        phone: '408-989-8745',
        email: 'john.doe@example.com'
      } */
  }
}