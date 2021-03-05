import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CovidData } from '../../models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter-double',
  templateUrl: './filter-double.component.html',
  styleUrls: ['./filter-double.component.css']
})
export class FilterDoubleComponent implements OnInit {

  constructor(private dataService : DataService) { }

  continents = ["Europe", "America", "Asia", "Oceania", "Africa", "Antartide"]
  classifications = ["Very low", "Low" , "Medium" , "High" , "Very high"]
  showResult = false;
  covidData : CovidData[]; //tutti i dati inseriti fino ad adesso
  continent : string;
  classification : string;

  ngOnInit(): void {
    this.getEntries();
  }

  filterBy(form : NgForm){
      this.continent = form.form.value.continent;
      this.classification = form.form.value.classification;

      if(this.continent && this.classification){
        this.showResult = true;
      }
  }

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.covidData = response;
    })
  }

}
