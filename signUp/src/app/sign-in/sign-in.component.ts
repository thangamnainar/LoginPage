import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService]
})
export class SignInComponent implements OnInit{

  visible=true

  email: string = '';
  password: string = '';
  loginResponse: any;
  constructor(private service: ServiceService,private route:Router,private messageService:MessageService, private aRoute : ActivatedRoute) { };

  ngOnInit(){


  }

  login(value: any) {
    this.service.login(value).subscribe({
      next: (response) => {
        console.log('reponse', response);
        this.loginResponse = response.status;
        this.show('success',response.message);
        if(this.loginResponse){
          this.visible=false;
          // this.route.navigate(['user/userForm']);
        }
      },
      error: (error:HttpErrorResponse) => {
        console.log('error', error.error);
        this.show('error',error.error.message);
      }
    })
  }
  show(type:'success' | 'error' ,message:string){
    this.messageService.add({ severity: type, summary: 'API Response', detail: message });
  }
}
