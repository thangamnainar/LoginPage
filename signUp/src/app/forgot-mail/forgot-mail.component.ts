import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-mail',
  templateUrl: './forgot-mail.component.html',
  styleUrls: ['./forgot-mail.component.scss']
})
export class ForgotMailComponent {

  email: string = '';
  getRsponse: any;
  constructor(private service: ServiceService, private router: Router) { }

  getMail(value: any) {
    console.log('value', value);
    localStorage.setItem('email', value.email);
    this.service.getMail(value).subscribe({
      next: (response) => {
        this.getRsponse = response.status;
        if (!(this.getRsponse)) {
          this.router.navigate(['forgot-otp']);
        }
        // console.log('response', response);        
        // console.log('response', this.getRsponse);
      }, error: (error) => {
        console.log('error', error);
      }
    })
  }


}
