import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  email: string = '';
  password: string = '';
  loginResponse: any;
  constructor(private service: ServiceService,private route:Router) { };
  
  login(value: any) {
    this.service.login(value).subscribe({
      next: (response) => {
        this.loginResponse = response.res;
        console.log('reponse', response);
      },
      error: (error) => {
        console.log('error', error);
      }
    })
    // this.route.navigate(['verifyOTP'])
  }

}
