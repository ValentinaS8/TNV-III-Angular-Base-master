import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  afghanistanDataArray: Array<ApiCoronaData> = [];
  countryName: string;
  europeCountries = ["Italia", "Portogallo", "Spagna", "Francia", "Belgio", "Paesi Bassi", "Lussemburgo",
    "Cipro", "Malta", "Austria", "Germania", "Polonia", "Danimarca", "Svezia", "Lettonia", "Lituania",
    "Estonia", "Regno Unito", "Irlanda", "Romania", "Grecia", "Croazia", "Slovenia", "Ungheria", "Repubblica Ceca",
    "Slovacchia", "Finlandia"];

  ngOnInit(): void {
  }

  getCountryCovidData(form: NgForm) {
    this.countryName = form.form.value.country;
    console.log(this.countryName);
    this.apiCovidService.getCountryCovidData(this.countryName).subscribe((data: ApiCoronaData) => {
      this.covidCountriesData = data;

      /*il campo che contiene la data all'interno del file json contiene 
       anche l'orario -> estrapolo la data*/
      for (let item in this.covidCountriesData) {
        if (this.covidCountriesData.data.updated_at.includes("T")) {
          let correctedData = this.covidCountriesData.data.updated_at.substring(0, 10);
          this.covidCountriesData.data.updated_at = correctedData;
        }

        //riduzione del numero delle cifre decimali del death_rate
        let deathrateString = (this.covidCountriesData.data.latest_data.calculated.death_rate).toString();
        //{{(this.afghanistanData.data.latest_data.calculated.death_rate) | number: '2.2-2'}}
        deathrateString = deathrateString.substring(0, 4);
        let deathrateCorrectedNumber = parseFloat(deathrateString);
        this.covidCountriesData.data.latest_data.calculated.death_rate = deathrateCorrectedNumber;
      }

      this.covidCountriesDataArray.push(this.covidCountriesData);//questo corrisponde a  this.dataEntry = form.form.value;
      //chiama il servizio del db e gli dà i dati da scrivere            
        this.covidService.addCovidEntry(this.covidCountriesData).subscribe(response => {
          console.log("Ho inviato i dati al db")
            //this.router.navigate(['/dashboard']);
        }
        )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData.data.latest_data)
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

      this.afghanistanDataArray.push(this.afghanistanData);//questo corrisponde a  this.dataEntry = form.form.value;
      //chiama il servizio del db e gli dà i dati da scrivere            
      this.covidService.addCovidEntry(this.afghanistanData).subscribe(response => {
        console.log("Ho inviato i dati al db")
        //this.router.navigate(['/dashboard']);
      }
      )
    },
      err => console.log(err),
      () => console.log("Loading countries data completed", this.afghanistanData.data.latest_data)
    )
  }
}

/*
 //fa la chiamata al servizio per avere la get con i dati di tutte le nazioni
  getCountriesCovidData() {
    this.apiCovidService.getCountriesData().subscribe((data: ApiCoronaData) =>
      this.covidCountriesData = data,
      err => console.log(err),
      () => console.log("Loading countries data completed", this.covidCountriesData)
    )
  }
*/


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



