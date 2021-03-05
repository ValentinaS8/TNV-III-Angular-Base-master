import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'continentclassification'
})
export class ContinentclassificationPipe implements PipeTransform {

  transform(value: any, continent : string, classification : string): any {
    let myArray=[];
    for(let i = 0; i<value.length; i++){
      if(value[i].classification === classification &&
        value[i].continent === continent){
          myArray.push(value[i])
        }
    }
    return myArray;
  }

}
