import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(covidDataArray: any, country: string): any {
    let myArray=[]
    for(let i=0; i<covidDataArray.length;i++){
      if(covidDataArray[i].country === country){
        myArray.push(covidDataArray[i]);
      }
    }
    return myArray;
  }

}
