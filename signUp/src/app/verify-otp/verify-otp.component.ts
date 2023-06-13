import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOTPComponent {

  verifyotp:string='';
  otpResponse:any;
  email = '';

  constructor(private service:ServiceService,private route:Router,private aRoute:ActivatedRoute) { 
  
  };
  
  verifyOtp(value:any){
    console.log(value);
    this.aRoute.queryParams.subscribe((params)=>{
      console.log(params);
      this.email = params['email'];
      console.log(this.email);    
    })
    this.service.verify(value.verifyotp,this.email).subscribe({
      next:(response)=>{
        this.otpResponse=response.res;
        if (this.otpResponse){
          alert('OTP is incorrect');
        }else{
        this.route.navigate(['sign-in']);
        }
        console.log('response',response);
      },error:(error)=>{
        console.log('error.....',error);
      }
    })
    // this.route.navigate(['sign-in']);
    
  }

}
