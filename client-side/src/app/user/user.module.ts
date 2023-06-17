import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service.service';
import { UserRoutingModule } from './user-routing.module';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
 
  ],
  providers: [ServiceService]
})
export class UserModule { }
