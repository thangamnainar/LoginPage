import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOTPComponent {

  verifyotp:string='';
  otpResponse:any;

  constructor(private service:ServiceService,private route:Router) { };
  
  verifyOtp(value:any){
    console.log(value);
    this.service.verify(value).subscribe({
      next:(response)=>{
        this.otpResponse=response.error;
        if (this.otpResponse){
          alert('OTP is wrong');
        }else{
        this.route.navigate(['sign-in']);
        }
        console.log('response',response);
      },
      error:(error)=>{
        console.log('error.....',error);
      }
    })
    // this.route.navigate(['sign-in']);
    
  }

}
