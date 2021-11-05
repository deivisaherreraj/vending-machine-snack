import { Injectable } from '@angular/core';
import { TableTransition } from '../models/tableTransition';
import { listStateTransition } from '../config/factories';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  myListTransition: Array<TableTransition> = [];

  public listStateTransition = listStateTransition;

  constructor() { }

  getNewGuid = () => {    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  loadingTableTransition(total: number) {
    let arrayEmpyt = Array<TableTransition>();
    
    for (let index = 0; index <= total; index+=500) {      
      let transition: TableTransition = {
        id: `Fila_${index}`,
        lineTransition: index,
        stateOne: undefined,
        stateTwo: undefined,
        stateThree: undefined,
        stateFour: undefined
      }

      listStateTransition.forEach(element => {
        var valueState = (index + element.value);
        var valueName = element.name ?? "";
        switch (valueName) {
          case "stateOne":
            if (valueState <= total) {
              transition.stateOne = valueState;
            }
            break;
        
          case "stateTwo":
            if (valueState <= total) {
              transition.stateTwo = valueState;
            }
            break;

          case "stateThree":
            if (valueState <= total) {
              transition.stateThree = valueState;
            }
            break;
          
          case "stateFour":
            if (valueState <= total) {
              transition.stateFour = valueState;
            }
            break;
        }        
      });

      arrayEmpyt.push(transition);     
    }    

    this.myListTransition = Array<TableTransition>();
    this.myListTransition = arrayEmpyt;
  }

  getValidValues = () => {
    let arrayValues = Array<number>();

    for (let index = 1000; index <= 5000; index+=500) {
      arrayValues.push(index);
    }

    return arrayValues;
  };
}
