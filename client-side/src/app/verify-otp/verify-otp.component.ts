import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOTPComponent implements OnInit{

  verifyotp: string = '';
  email: any = '';

  constructor(private service: ServiceService, private route: Router, private aRoute: ActivatedRoute,private messageService:MessageService) { }

  verifyOtp(value: any) {
    console.log(value);    
    this.service.verify(value.verifyotp, this.email).subscribe({
      next: (response) => {
        this.show('success',response.message);
        if (response.status) {
          this.route.navigate(['sign-in']);
        }
        console.log('response', response);
      }, error: (error:HttpErrorResponse) => {
        console.log('error.....', error);
        console.log('error.....', error.error.message);        
        this.show('error', error.error.message);
      }
    })

  }

  ngOnInit() {
    // this.aRoute.queryParams.subscribe((params): void => {
    //   this.email = params['email'];
    //   // You can now use the 'email' value in this component
    // });
    this.email =localStorage.getItem('email');
    console.log('email',this.email);
  }


  reSendMail() {
    // this.email = this.aRoute.snapshot.paramMap.get('email');
    this.service.signUpReSendMail(this.email).subscribe({
      next: (response) => {
        console.log('response', response);
        this.show('success',response.message);
      }, error: (error) => {
        console.log('error', error);
      }
    })
  }

  show(type: 'success' | 'error', message: string) {
    this.messageService.add({ severity: type, detail: message });
  }

}
