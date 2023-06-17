import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path:'form/:id/:boolean',component:FormComponent
  },
  {
    path:'form',component:FormComponent
  },
  {
    path:'table',component:TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
