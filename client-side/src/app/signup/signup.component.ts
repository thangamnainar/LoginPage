import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  userName: string = '';

  constructor(private service: ServiceService, private route: Router, private messageService: MessageService) { };
  createUser(value: any) {
    this.service.postData(value).subscribe({
      next: (response) => {
        console.log('response', response);
        if (response.status) {
          localStorage.setItem('email', value.email);
          this.show('success', response.message);
          this.route.navigate(['verifyOTP'])
          // console.log({ queryParams: { email: value.email } }); 
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('error Message.....', error);
        this.show('error', error.error.message);
      }
    })
    console.log(value);
  }

  show(type: 'success' | 'error', message: string) {
    this.messageService.add({ severity: type,  detail: message });
  }

}
