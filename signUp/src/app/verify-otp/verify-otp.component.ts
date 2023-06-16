import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
  providers: [MessageService]
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
          // this.route.navigate(['sign-in']);
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
    this.email = this.aRoute.snapshot.paramMap.get('email');
    // this.email= this.aRoute.snapshot.paramMap.get('email');
    console.log('email',this.email.email);
  }


  reSendMail() {
    // this.email = this.aRoute.snapshot.paramMap.get('email');
    this.service.reSendMail(this.email).subscribe({
      next: (response) => {
        console.log('response', response);
      }, error: (error) => {
        console.log('error', error);
      }
    })
  }

  show(type: 'success' | 'error', message: string) {
    this.messageService.add({ severity: type, summary: 'API Response', detail: message });
  }

}
