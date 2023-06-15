import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { ForgotMailComponent } from './forgot-mail/forgot-mail.component';
import { ForgotPaswordComponent } from './forgot-pasword/forgot-pasword.component';
import { ForgotPassOtpComponent } from './forgot-pass-otp/forgot-pass-otp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',redirectTo:'signup',pathMatch:'full'
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
  },
  {
    path:'forgot-mail',component:ForgotMailComponent
  },
  {
    path:'forgot-password/:otp',component:ForgotPaswordComponent
  },
  {
    path:'forgot-password',component:ForgotPaswordComponent
  },
  {
    path:'forgot-otp',component:ForgotPassOtpComponent
  }, {
    path:'signup',component:SignupComponent
  },
  // {
  //   path:'home',component:HomeComponent ,
  //   children:[
  //     {
  //       path:'sign-in',component:SignInComponent,
  //       children :[{
  //         path:'form/:id',component:FormComponent,
  //         children : [{
  //           path:'table',component:TableComponent
  //         }]
  //       }]
  //     }, {
  //       path:'form/:id',component:FormComponent
  //     }
  //   ]

  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
