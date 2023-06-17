import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.scss'],
})
export class ForgotPaswordComponent implements OnInit {

  password: string = '';
  getOtp: any;

  constructor(private service: ServiceService, private activateRouter: ActivatedRoute, private messageService:MessageService) { }

  ngOnInit() {
    this.getOtp = this.activateRouter.snapshot.paramMap.get('otp');
    console.log('getOtp', this.getOtp);
  }


  resetPassword(value: any) {
    let getMail = localStorage.getItem('email');
    console.log('value', value,);
    this.service.resetPassword(value, getMail, this.getOtp).subscribe({
      next: (response) => {
        this.show('success', response.message);
        console.log('response', response);
      }, error: (error:HttpErrorResponse) => {
        console.log('error', error);
      }
    })
  }

  show(type: 'error' | 'success', message: string){
    this.messageService.add({severity:type, summary:'API Response', detail:message});
  }

}
