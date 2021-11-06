import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';
import { Network, DataSet, Node, Edge } from 'vis';

@Component({
  selector: 'app-transition-table',
  templateUrl: './transition-table.component.html',
  styleUrls: ['./transition-table.component.css']
})
export class TransitionTableComponent implements OnInit {
  @ViewChild("svgNetwork") svgNetworkContainer: ElementRef | undefined;

  public container: any;
  public length: number = 0;  
  public displayedColumns: string[] = [
    'lineTransition',
    'stateOne',
    'stateTwo',
    'stateThree',
    'stateFour'
  ];  

  constructor(
    public machineService: MachineService
  ) { }

  ngOnInit(): void {
    this.length = this.machineService.myListTransition.length;    
  }

  ngAfterViewInit() {
    this.container = this.svgNetworkContainer?.nativeElement;
    this.machineService.setContainer(this.container);    
  }

  generateFiniteAutomaton() {
    let arrayNodes: Array<Node> = [];
    let arrayEdges: Array<Edge> = [];
    let arrayFilter: Array<Node> = [];   

    this.machineService.realTime = false;
    this.machineService.myListTransition.forEach(element => {
      arrayFilter = arrayNodes.filter(mls => mls.id == element.lineTransition);
      if (arrayFilter.length <= 0) {
        arrayNodes.push({ id: element.lineTransition, label: `${element.lineTransition}`, shape: 'circle', size: 30 });
      }

      if (element.stateOne != undefined) {
        arrayFilter = arrayNodes.filter(mls => mls.id == element.stateOne);
        if (arrayFilter.length <= 0) {
          arrayNodes.push({ id: element.stateOne, label: `${element.stateOne}`, shape: 'circle', size: 30 });
        }
        arrayEdges.push({ from: element.lineTransition, to: element.stateOne, label: `${element.stateOneLabel}` });
      }

      if (element.stateTwo != undefined) {
        arrayFilter = arrayNodes.filter(mls => mls.id == element.stateTwo);
        if (arrayFilter.length <= 0) {
          arrayNodes.push({ id: element.stateTwo, label: `${element.stateTwo}`, shape: 'circle', size: 30 });
        }
        arrayEdges.push({ from: element.lineTransition, to: element.stateTwo, label: `${element.stateTwoLabel}` });
      }

      if (element.stateThree != undefined) {
        arrayFilter = arrayNodes.filter(mls => mls.id == element.stateThree);
        if (arrayFilter.length <= 0) {
          arrayNodes.push({ id: element.stateThree, label: `${element.stateThree}`, shape: 'circle', size: 30 });
        }
        arrayEdges.push({ from: element.lineTransition, to: element.stateThree, label: `${element.stateThreeLabel}` });
      }

      if (element.stateFour != undefined) {
        arrayFilter = arrayNodes.filter(mls => mls.id == element.stateFour);
        if (arrayFilter.length <= 0) {
          arrayNodes.push({ id: element.stateFour, label: `${element.stateFour}`, shape: 'circle', size: 30 });
        }
        arrayEdges.push({ from: element.lineTransition, to: element.stateFour, label: `${element.stateFourLabel}` });
      }
    });

    var nodes = new DataSet(arrayNodes);    
    var edges = new DataSet(arrayEdges);

    let treeData = {
      nodes: nodes,
      edges: edges
    };
    let options = this.machineService.getOptionsTreeData();
    let network = new Network(this.container, treeData, options);
  }  
}
