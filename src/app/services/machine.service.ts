import { Injectable } from '@angular/core';
import { TableTransition } from '../models/tableTransition';
import { listStateTransition } from '../config/factories';
import { Network, DataSet, Node, Edge, IdType } from 'vis';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  myListTransition: Array<TableTransition> = [];
  myNodes: Array<number> = [];
  myEdges: Array<number> = [];  
  myNetwork: any;
  myContainer: any;

  public listStateTransition = listStateTransition;

  constructor() { }     

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

  getTreeData = (displayTotal: number, moneyTotal?: number) => {    
    var nodes = new DataSet([
      { id: displayTotal, label: `${displayTotal}`, shape: 'circle', size: 30 },
      { id: moneyTotal, label: `${moneyTotal}`, shape: 'circle', size: 30 }
    ]);    

    // create an array with edges
    var edges = new DataSet([
      { from: displayTotal, to: moneyTotal }
    ]);

    let treeData = {
      nodes: nodes,
      edges: edges
    };

    return treeData;
  };

  getOptionsTreeData() {
    var options = {
      nodes: { // Control de nodos                
        borderWidth: 1, // Ajuste de ancho de borde de nodo
        borderWidthSelected: 10 // Haga clic en la configuración de ancho cuando esté seleccionado,        
      },
      edges:{ // Control de la relación
        width: 1, // Ancho de línea de relación
        arrows: { // Flecha
          to: {
            enabled: true, // Si la flecha se muestra y se enciende
            scaleFactor: 0.5, // Tamaño de la flecha
            type: 'arrow', // Tipos de flechas: círculo, barra, flechas.
          }
        },
        font: {
          size: 5,
          color:'green',
          align: 'horizontal',
        },
        length: 60, // Establecer la longitud de la línea de relación
        dashes: false, // La línea punteada de la línea de relación, falso no es, verdadero es
        arrowStrikethrough: true, // No hay espacio entre la línea de relación y el nodo
        color: {
          color: 'red', // Configuración de color de línea de relación
          highlight: 'black' // Color al hacer clic en la línea de relación
        }
      }
    };

    return options;
  }

  drawSvgNetwork(displayTotal: number, moneyTotal?: number) {  
    let treeData = this.getTreeData(displayTotal, moneyTotal);
    let options = this.getOptionsTreeData();
    let network = new Network(this.myContainer, treeData, options);
  }

  getNewGuid = () => {    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  getValidValues = () => {
    let arrayValues = Array<number>();

    for (let index = 1000; index <= 5000; index+=500) {
      arrayValues.push(index);
    }

    return arrayValues;
  };

  setContainer(container: any) {
    this.myContainer = container;
  }
}
