import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-forgot-mail',
  templateUrl: './forgot-mail.component.html',
  styleUrls: ['./forgot-mail.component.scss'],
})
export class ForgotMailComponent {

  email: string = '';
  constructor(private service: ServiceService, private router: Router, private messageService:MessageService) { }

  getMail(value: any) {
    console.log('value', value);
    localStorage.setItem('email', value.email);
    this.service.getMail(value).subscribe({
      next: (response) => {
        if (response.status) {
          this.show('success', response.message);
          this.router.navigate(['forgot-otp']);
        }
        // console.log('response', response);        
        // console.log('response', this.getRsponse);
      }, error: (error:HttpErrorResponse) => {
        this.show('error', error.error.message);
        console.log('error', error.error.message);
      }
    })
  }

  show(type:'error'|'success',message:string){
    this.messageService.add({severity:type, detail:message});
  }



}
