import { Component ,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-pass-otp',
  templateUrl: './forgot-pass-otp.component.html',
  styleUrls: ['./forgot-pass-otp.component.scss'],
})
export class ForgotPassOtpComponent implements OnInit{

  verifyotp: string = '';
  getMail:any;
  
  constructor(private service:ServiceService,private router:Router,private activateRouter:ActivatedRoute, private messageService:MessageService) { }

  ngOnInit(){
   this.getMail = localStorage.getItem('email');
  }

  verifyOtp(value: any) {
    console.log('value', value);
    this.service.verifyMailOtp(value.verifyotp,this.getMail).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response.status) {
          this.router.navigate(['forgot-password',value.verifyotp]);
          // this.router.navigate(['forgot-password']);
        }
      }, error: (error:HttpErrorResponse) => {
        this.show('error', error.error.message);
        console.log('error', error);
      }
    })
  }

  reSendMail(){
    this.service.reSendMail(this.getMail).subscribe({
      next:(response)=>{
        console.log('response',response);
        this.show('success', response.message);
      },error:(error)=>{
        console.log('error',error);
      }
    })
  }

  show(type:'error'|'success',message:string){
    this.messageService.add({severity:type, detail:message});
  }
}
