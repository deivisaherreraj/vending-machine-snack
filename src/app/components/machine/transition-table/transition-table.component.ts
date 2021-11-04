import { Component, OnInit } from '@angular/core';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-transition-table',
  templateUrl: './transition-table.component.html',
  styleUrls: ['./transition-table.component.css']
})
export class TransitionTableComponent implements OnInit {
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

}
