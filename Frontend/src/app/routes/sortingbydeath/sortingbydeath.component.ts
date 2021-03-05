import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CovidData } from '../../models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sortingbydeath',
  templateUrl: './sortingbydeath.component.html',
  styleUrls: ['./sortingbydeath.component.css']
})
export class SortingbydeathComponent implements OnInit {

  sortOptions = ["number of deaths"]
  showResult = false;
  covidData : CovidData[];
  orderedItems : CovidData[];

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.getEntries();
  }

  filterByDeath(form : NgForm){
      this.showResult=true;
      this.orderedItems=this.covidData.sort((a,b)=> - (a.deaths - b.deaths))
  }

  getEntries(){
    this.dataService.getData().subscribe((response:any)=>{
      this.covidData = response;
     
    })
  }

}
