import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';
import { Network, DataSet, Node, Edge, IdType } from 'vis';

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
}
