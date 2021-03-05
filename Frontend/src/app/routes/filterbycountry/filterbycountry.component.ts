import { Component, OnInit } from '@angular/core';
import { CovidData } from '../../models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filterbycountry',
  templateUrl: './filterbycountry.component.html',
  styleUrls: ['./filterbycountry.component.css']
})
export class FilterbycountryComponent implements OnInit {

  covidData : CovidData[];
  country : string;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.getEntries()
  }

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.covidData = response;
    })
  }
}
