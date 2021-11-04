import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MachineComponent } from './components/machine/machine.component';
import { VendingMachineComponent } from './components/machine/vending-machine/vending-machine.component';
import { TransitionTableComponent } from './components/machine/transition-table/transition-table.component';
import { FooterComponent } from './components/machine/footer/footer.component';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    VendingMachineComponent,
    TransitionTableComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
