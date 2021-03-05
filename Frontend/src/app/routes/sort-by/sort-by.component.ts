import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CovidData } from '../../models/data.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {

  covidData : CovidData[];
  showResult = false;
  sortOptions = ["deaths", "cases", "recoveries"]
  sortOption : string;
  orderedItems : CovidData[];

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries(){
    this.dataService.getData().subscribe((response:any)=>{
      this.covidData = response;
     
    })
  }

  sortBy(form : NgForm){
      this.sortOption = form.form.value.sort;
      this.showResult=true;
      this.orderedItems=this.covidData.sort((a,b)=> a[this.sortOption] - 
      b[this.sortOption])
  }

}
