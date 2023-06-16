import { Component ,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass-otp',
  templateUrl: './forgot-pass-otp.component.html',
  styleUrls: ['./forgot-pass-otp.component.scss']
})
export class ForgotPassOtpComponent implements OnInit{

  verifyotp: string = '';
  otpResponse:any;
  getMail:any;
  constructor(private service:ServiceService,private router:Router,private activateRouter:ActivatedRoute) { }

  ngOnInit(){
   this.getMail = localStorage.getItem('email');
  }

  verifyOtp(value: any) {
    console.log('value', value);
    this.service.verifyMailOtp(value.verifyotp,this.getMail).subscribe({
      next: (response) => {
        this.otpResponse = response.status;
        console.log('response', response);
        if (!(response.result)) {
          this.router.navigate(['forgot-password',value.verifyotp]);
          // this.router.navigate(['forgot-password']);
        }
      }, error: (error) => {
        console.log('error', error);
      }
    })
  }

  reSendMail(){
    this.service.reSendMail(this.getMail).subscribe({
      next:(response)=>{
        console.log('response',response);
      },error:(error)=>{
        console.log('error',error);
      }
    })
  }

}
