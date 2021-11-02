import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent implements OnInit {
  formSnack: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  )  
  { 
    this.formSnack = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.pattern(new RegExp(`^\\d+$`))]]      
    });
  }

  ngOnInit(): void {
  }

}
