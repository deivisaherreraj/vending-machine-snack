import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Snack } from 'src/app/models/snack';
import { TableTransition } from 'src/app/models/tableTransition';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {
  formSnack: FormGroup;
  formMachine: FormGroup;

  public returnAmount: number = 0;
  public displayTotal: number = 0;
  public selectedValue: number = 0;
  public selectedProduct: string | undefined;
  public myListSnack: Snack[] = [
    {id: 'asdr514', name: 'Pinchos charcuteros', value: 1000},
    {id: 'weqw82', name: 'Picada de Chorizos', value: 2000},
    {id: 'hlhmkb56', name: 'Sandwich de Jamón', value: 4000},
  ];

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
      this.toastr.error('El prodcuto a registrar ya existe.', 'Error');      
      return;
    }

    this.myListSnack.push(product);

    this.toastr.success('El producto fue registrado.', 'Registro guardado');    
    this.formSnack.reset();
  }

  setStateTransition(money: number) {
    if (this.selectedValue <= 0) {
      this.toastr.error('Debe seleccionar el producto a reclamar.', 'Error');      
      return;
    }

    this.machineService.myListTransition.forEach(element => {
      if (this.displayTotal <= this.selectedValue) {            
        if (element.id == `Fila_${this.displayTotal}`) {
          let sumTotal = (this.displayTotal + money);
          if (sumTotal <= this.selectedValue) {            
            switch (sumTotal) {
              case element.stateOne:
                element.stateOneClass = 'red';
                break;
              case element.stateTwo:
                element.stateTwoClass = 'red';
                break; 
              case element.stateThree:
                element.stateThreeClass = 'red';
                break; 
              case element.stateFour:
                element.stateFourClass = 'red';
                break;            
            } 
          } else {
            element.stateOneClass = '';
            element.stateTwoClass = '';
            element.stateThreeClass = '';
            element.stateFourClass = '';
          }        
        } else {
          element.stateOneClass = '';
          element.stateTwoClass = '';
          element.stateThreeClass = '';
          element.stateFourClass = '';
        }
      }
    });

    this.displayTotal += money;
  }

  claimProduct() {
    if (this.displayTotal > this.selectedValue) {
      let totalReturn = (this.displayTotal - this.selectedValue);
      this.returnAmount = totalReturn;
      this.displayTotal -= totalReturn;
      this.toastr.warning('La cantidad ingresa supera el valor del producto seleccionado.', 'Mensaje');
      return;
    }

    if (this.displayTotal < this.selectedValue) {      
      this.toastr.warning('La cantidad ingresa no es igual al precio del producto seleccionado.', 'Mensaje');
      return;
    }

    if (this.displayTotal == this.selectedValue) {
      this.returnAmount = 0;
      this.toastr.success('El producto fue entregado.', 'Entrega');
    }
  }

  clearProduct() {
    this.myListSnack = Array<Snack>();
    this.machineService.myListTransition = Array<TableTransition>();
    this.returnAmount = 0;
    this.displayTotal = 0;
    this.selectedValue = 0;
  }

  radioChange(element: any) {    
    this.displayTotal = 0;
    this.returnAmount = 0;
    this.selectedValue = element.value;
    this.machineService.loadingTableTransition(this.selectedValue);
  }
}
