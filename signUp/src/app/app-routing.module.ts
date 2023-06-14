import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path:'',component:SignupComponent,
  },
  {
    path:'verifyOTP',component:VerifyOTPComponent
  },
  {
    path:'sign-in',component:SignInComponent
  },
  {
    path:'form/:id',component:FormComponent
  },
  {
    path:'table',component:TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
