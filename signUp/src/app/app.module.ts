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

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignupComponent,
    VerifyOTPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
