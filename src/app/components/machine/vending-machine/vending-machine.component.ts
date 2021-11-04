import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Snack } from 'src/app/models/snack';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {
  formSnack: FormGroup;
  formMachine: FormGroup;

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
      display: ''
    });

    this.formMachine.get('display')?.setValue('0');
    this.formMachine.controls['display'].disable();
  }

  ngOnInit(): void {
  }

  addProduct() {
    const product: Snack = {
      id: this.machineService.getNewGuid(),
      name: this.formSnack.get('name')?.value,
      value: this.formSnack.get('value')?.value
    }
    
    let name = product.name?.toLowerCase();
    let snackObject = this.myListSnack.filter(mls => mls.name?.toLowerCase() == name);    

    if (snackObject.length > 0) {
      this.toastr.error('El prodcuto a registrar ya existe', 'Error');      
      return;
    }

    this.myListSnack.push(product);

    this.toastr.success('El producto fue registrado.', 'Registro guardado');    
    this.formSnack.reset();
  }

  clearProduct() {
    this.myListSnack = Array<Snack>();
  }

  radioChange(element: any) {    
    this.selectedValue = element.value;
    this.machineService.loadingTableTransition(this.selectedValue);
  }
}
