import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCoronaData } from 'src/app/models/apiCorona.model';
import { CovidService } from 'src/app/services/covid.service';
import { ApiCovidService } from '../../services/api-covid.service';


@Component({
  selector: 'app-prove-api-corona',
  templateUrl: './prove-api-corona.component.html',
  styleUrls: ['./prove-api-corona.component.css']
})

export class ProveApiCoronaComponent implements OnInit {

  constructor(private router: Router, private covidService: CovidService, private apiCovidService: ApiCovidService) { }

  covidCountriesData: ApiCoronaData;
  covidCountriesDataArray: Array<ApiCoronaData> = [];
  afghanistanData: ApiCoronaData;
  //afghanistanSemplifiedData: ApiCoronaDataSemplified;
  afghanistanDataArray: Array<ApiCoronaData> = [];
  //afghanistanDataArray: Array<ApiCoronaDataSemplified> = [];

  ngOnInit(): void {
  }

  //fa la chiamata al servizio per avere la get con i dati di tutte le nazioni
  getCountriesCovidData() {
    this.apiCovidService.getCountriesData().subscribe((data: ApiCoronaData) =>
      this.covidCountriesData = data,
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData)
    )
  }

  getAfghanistanData() {
    this.apiCovidService.getAfghanistanData().subscribe((data: ApiCoronaData) => {
      this.afghanistanData = data;

      /*il campo che contiene la data all'interno del file json contiene 
       anche l'orario -> estrapolo la data*/
      for (let item in this.afghanistanData) {
        if (this.afghanistanData.data.updated_at.includes("T")) {
          let correctedData = this.afghanistanData.data.updated_at.substring(0, 10);
          this.afghanistanData.data.updated_at = correctedData;
        }
        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.afghanistanData.data.latest_data.calculated.death_rate).toString();
        //{{(this.afghanistanData.data.latest_data.calculated.death_rate) | number: '2.2-2'}}
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.afghanistanData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      console.log(this.afghanistanData);
      this.afghanistanDataArray.push(this.afghanistanData);//questo corrisponde a  this.dataEntry = form.form.value;
      //chiama il servizio del db e gli dà i dati da scrivere            
      this.covidService.addCovidEntry(this.afghanistanData).subscribe(response => {
        console.log("Ho inviato i dati al db")
        // this.router.navigate(['/dashboard']);
      }
      )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.afghanistanData.data.latest_data)
    )
  }

  /*  transfertData() {
      //this.afghanistanSemplifiedData = JSON.parse(JSON.stringify(this.afghanistanData))
      for (let item in this.afghanistanData) {
        this.afghanistanSemplifiedData.country_name = this.afghanistanData.data.name;
        this.afghanistanSemplifiedData.population = this.afghanistanData.data.population;
        this.afghanistanSemplifiedData.date = this.afghanistanData.data.updated_at;
        this.afghanistanSemplifiedData.today_deaths = this.afghanistanData.data.today.deaths;
        this.afghanistanSemplifiedData.today_cases = this.afghanistanData.data.today.confirmed;
        this.afghanistanSemplifiedData.total_deaths = this.afghanistanData.data.latest_data.deaths;
        this.afghanistanSemplifiedData.total_cases = this.afghanistanData.data.latest_data.confirmed;
        this.afghanistanSemplifiedData.death_rate = this.afghanistanData.data.latest_data.calculated.death_rate;
        this.afghanistanSemplifiedData.cases_per_million_people = this.afghanistanData.data.latest_data.calculated.cases_per_million_population;
      }
  
    }*/
}
  /*
onSubmit(form : NgForm){
this.dataEntry = form.form.value;
console.log(form)
console.log(this.dataEntry);

//chiama il servizio e gli dà i dati da scrivere
this.dataService.addEntry(this.dataEntry).subscribe(response => {
console.log(response);
this.router.navigate(['/dashboard']);
},
(err) => {
//fai qualcosa
}
)
}
*/

/*PROVA:
getCountriesCovidData() {
  this.apiCovidService.getCountriesData().subscribe((data: ApiCoronaData) => {
    this.covidCountriesData = data,
    this.covidCountriesDataArray.push(this.covidCountriesData)
  },
    err => console.log(err),
    () => console.log("Loading countries data completed", this.covidCountriesData)
  )
}*/



/* getOneCountryData(countryCode : string)
 {
   this.apiCovidService.getOneCountryData(countryCode).subscribe((data: CoronaCountryProva) => {
     this.oneCountryData = data;
   },
   err => console.log(err),
   () => console.log("Loading countries data completed", JSON.stringify(this.oneCountryData))
   //() => console.log("Loading countries data completed", JSON.stringify(this.covidCountriesData))
 )
// return null;
 }*/



