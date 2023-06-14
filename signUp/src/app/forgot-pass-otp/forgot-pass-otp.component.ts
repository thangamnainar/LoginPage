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

  constructor(private service:ServiceService,private router:Router) { }

  ngOnInit(){
   let  email = localStorage.getItem('email');
  }

  verifyOtp(value: any) {
    console.log('value', value);
   let  email = localStorage.getItem('email');
    this.service.verifyMailOtp(value.verifyotp,email).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response.res) {
          alert('OTP is incorrect');
        } else {
          this.router.navigate(['reset-password']);
        }
      }, error: (error) => {
        console.log('error', error);
      }
    })

    this.router.navigate(['forgot-password']);
  }

}
