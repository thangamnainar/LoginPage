import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  userName: string = '';
  postResponse: any;

  constructor(private service: ServiceService, private route: Router) { };
  createUser(value: any) {
    this.service.postData(value).subscribe({
      next: (response) => {
        this.postResponse = (response.res);
        console.log('response', this.postResponse);
                console.log('response', response);
        if(this.postResponse){
          // alert('User Already Exist')
        }else{
          this.route.navigate(['verifyOTP'])
        }
      },
      error: (error) => {
        console.log('error Message', error);
      }
    })
    console.log(value);

  }

}
