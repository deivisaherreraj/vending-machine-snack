import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Snack } from 'src/app/models/snack';
import { TableTransition } from 'src/app/models/tableTransition';
import { MachineService } from 'src/app/services/machine.service';
import { defaultSnackData } from 'src/app/config/factories';
import { TransitionTableComponent } from 'src/app/components/machine/transition-table/transition-table.component';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {
  @ViewChild(TransitionTableComponent) transitionTable: TransitionTableComponent | undefined;

  formSnack: FormGroup;
  formMachine: FormGroup;
  
  public buttonClaim: boolean = false;
  public returnAmount: number = 0;
  public displayTotal: number = 0;
  public selectedValue: number = 0;
  public selectedProduct: string | undefined;
  public defaultSnackData = defaultSnackData;
  public myListSnack: Snack[] = defaultSnackData;

  constructor(
    private formBuilder: FormBuilder,
    private machineService: MachineService,
    private toastr: ToastrService
  )  
  { 
    this.formSnack = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(1000), Validators.max(5000), Validators.pattern(new RegExp(`^\\d+$`))]]      
    });

    this.formMachine = this.formBuilder.group({
      options: '',
      display: '',
      amount: ''
    });

    this.formMachine.get('amount')?.setValue('0');
    this.formMachine.get('display')?.setValue('0');
    this.formMachine.controls['display'].disable();
  }

  ngOnInit(): void {
  }

  addProduct() {
    let arrayValues = this.machineService.getValidValues();
    
    const product: Snack = {
      id: this.machineService.getNewGuid(),
      name: this.formSnack.get('name')?.value,
      value: this.formSnack.get('value')?.value
    }
    
    let value = product.value ?? 0;
    let name = product.name?.toLowerCase();
    let snackObject = this.myListSnack.filter(mls => mls.name?.toLowerCase() == name);    

    if (!arrayValues.includes(value)) {
      this.toastr.error('El valor del producto esta fuera del intervalo.', 'Error');      
      return;
    }

    if (snackObject.length > 0) {
      this.toastr.error('El producto a registrar ya existe.', 'Error');      
      return;
    }

    this.myListSnack.push(product);

    this.toastr.success('El producto fue registrado.', 'Registro guardado');    
    this.formSnack.reset();
  }

  setStateTransition(moneyTotal: number) {
    if (this.selectedValue <= 0) {
      this.toastr.error('Debe seleccionar el producto a reclamar.', 'Error');      
      return;
    }

    let sumTotal = (this.displayTotal + moneyTotal);

    if (sumTotal > this.selectedValue) {
      this.returnAmount += moneyTotal;
      this.toastr.error('El valor ingresado suma un precio mayor al producto.', 'Error');      
      return;
    }

    this.machineService.myListTransition.forEach(element => {
      if (this.displayTotal <= this.selectedValue) {            
        if (element.id == `Fila_${this.displayTotal}`) {
          if (sumTotal <= this.selectedValue) {
            this.machineService.drawSvgNetwork(this.displayTotal, sumTotal, moneyTotal);
            switch (sumTotal) {
              case element.stateOne:
                element.stateOneClass = '#673ab7';
                break;
              case element.stateTwo:
                element.stateTwoClass = '#673ab7';
                break; 
              case element.stateThree:
                element.stateThreeClass = '#673ab7';
                break; 
              case element.stateFour:
                element.stateFourClass = '#673ab7';
                break;            
            } 
          }
        }
      }
    });      

    this.displayTotal += moneyTotal;
  }

  claimProduct() {
    if (this.myListSnack.length <= 0) {
      this.toastr.error('No hay productos registrados para retirar.', 'Error');
      return;
    }

    if (this.selectedValue <= 0) {
      this.toastr.error('No ha seleccionado el producto para retirar.', 'Error');
      return;
    }    

    if (this.displayTotal < this.selectedValue) {      
      this.toastr.warning('La cantidad ingresa no es igual al precio del producto seleccionado.', 'Mensaje');
      return;
    }

    if (this.displayTotal == this.selectedValue) {
      this.returnAmount = 0;
      this.buttonClaim = true;
      this.machineService.drawSvgNetworkFinalState(this.selectedValue);      
      this.toastr.success('El producto fue entregado.', 'Retiro');
    }
  }

  /*
   * Metodo para inicialiar todo los controles.
   */
  clearProduct() {
    this.myListSnack = Array<Snack>();
    this.machineService.myListTransition = Array<TableTransition>();
    this.machineService.myNodes = [];
    this.machineService.myEdges = [];
    this.machineService.myNetwork.setData({ nodes: [], edges: [] });    
    this.returnAmount = 0;
    this.displayTotal = 0;
    this.selectedValue = 0;
    this.buttonClaim = false;
  }

  /*
   * Metodo del evento del control radio button para general la tabla de transición al seleccionar el producto
   */
  radioChange(element: any) {
    this.displayTotal = 0;
    this.returnAmount = 0;
    this.buttonClaim = false;
    this.selectedValue = element.value;
    this.machineService.realTime = true;
    this.machineService.loadingTableTransition(this.selectedValue);
    this.machineService.loadVisTree();
  }
}
