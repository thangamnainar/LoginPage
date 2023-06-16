import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { SignupComponent } from './signup/signup.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormComponent } from '../app/user/form/form.component';
import { TableComponent } from './table/table.component';
import { ForgotMailComponent } from './forgot-mail/forgot-mail.component';
import { ForgotPaswordComponent } from './forgot-pasword/forgot-pasword.component';
import { ForgotPassOtpComponent } from './forgot-pass-otp/forgot-pass-otp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 
  {
    path:'verifyOTP',component:VerifyOTPComponent
  },
  {
    path:'sign-in',component:SignInComponent,
    // children :[{
    //   path:'go',component:FormComponent,
    // }]
  },
  {
    path:'',redirectTo:'signup',pathMatch:'full'
  },
  // {
  //   path:'form/:id',component:FormComponent
  // },
  // {
  //   path:'table',component:TableComponent
  // },
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
  {
    path:'home',component:HomeComponent ,
    // children:[
    //   {
    //     path:'sign-in',component:SignInComponent,
    //     children :[{
    //       path:'form/:id',component:FormComponent,
    //       children : [{
    //         path:'table',component:TableComponent
    //       }]
    //     }]
    //   }, {
    //     path:'form/:id',component:FormComponent
    //   }
    // ]

  },
  {
    path:'user',
    loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
