import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.scss']
})
export class ForgotPaswordComponent implements OnInit {

  password: string = '';
  getOtp: any;
  getResponse: any;

  constructor(private service: ServiceService, private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.getOtp = this.activateRouter.snapshot.paramMap.get('otp');
    console.log('getOtp', this.getOtp);
  }
  resetPassword(value: any) {
    let getMail = localStorage.getItem('email');
    console.log('value', value,);
    this.service.resetPassword(value, getMail, this.getOtp).subscribe({
      next: (response) => {
        this.getResponse = response.status;
        console.log('response', response);
      }, error: (error) => {
        console.log('error', error);
      }
    })
  }

}
