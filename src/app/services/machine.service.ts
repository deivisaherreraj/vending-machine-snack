import { Injectable } from '@angular/core';
import { TableTransition } from '../models/tableTransition';
import { listStateTransition } from '../config/factories';
import { Network, DataSet, Node, Edge } from 'vis';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  myListTransition: Array<TableTransition> = [];
  myNodes: Array<Node> = [];
  myEdges: Array<Edge> = [];  
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

  getTreeData = () => {    
    // Creamos los estado del automata finito.
    var nodes = new DataSet(this.myNodes);

    // crear una matriz con bordes.   
    var edges = new DataSet(this.myEdges);

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

  drawSvgNetwork(displayTotal: number, valueTotal: number) {
    // Agregamos el estado al automata finito.
    this.myNodes.push({ 
      id: valueTotal, 
      label: `${valueTotal}`, 
      shape: 'circle', 
      size: 30 
    });

    // Agregamos las transiciones a los estados.
    this.myEdges.push({ 
      from: displayTotal, 
      to: valueTotal 
    });
    
    // Modificamos el automata finito con los nuevos valores.
    this.myNetwork.setData({
      nodes: this.myNodes,
      edges: this.myEdges
    });
  }

  drawSvgNetworkFinalState(valueTotal: number) {
    if (this.myNodes.length == 1) {
      // Agregamos el estado al automata finito.
      this.myNodes.push({ 
        id: valueTotal, 
        label: `${valueTotal}`, 
        shape: 'circle', 
        size: 30 
      });

      // Agregamos las transiciones final del automata finito.
      this.myEdges.push({ 
        from: 0, 
        to: valueTotal 
      });
    }

    // Agregamos las transiciones final del automata finito.
    this.myEdges.push({ 
      from: valueTotal, 
      to: 0 
    });
    
    // Modificamos el automata finito con los nuevos valores.
    this.myNetwork.setData({
      nodes: this.myNodes,
      edges: this.myEdges
    });
  }

  loadVisTree = () => {
    this.myNodes = [];
    this.myEdges = [];

    this.myNodes.push({ 
      id: 0, 
      label: `${0}`, 
      shape: 'circle', 
      size: 30 
    });

    let treeData = this.getTreeData();
    let options = this.getOptionsTreeData();
    this.myNetwork = new Network(this.myContainer, treeData, options);
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
