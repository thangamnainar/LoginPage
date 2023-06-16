import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceService } from './service.service';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SignupComponent } from './signup/signup.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { ForgotPaswordComponent } from './forgot-pasword/forgot-pasword.component';
import { ForgotMailComponent } from './forgot-mail/forgot-mail.component';
import { ForgotPassOtpComponent } from './forgot-pass-otp/forgot-pass-otp.component';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignupComponent,
    VerifyOTPComponent,
    FormComponent,
    TableComponent,
    HomeComponent,
    ForgotPaswordComponent,
    ForgotMailComponent,
    ForgotPassOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
