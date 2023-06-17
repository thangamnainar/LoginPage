import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit{

  // visible=true

  email: string = '';
  password: string = '';
  constructor(private service: ServiceService,private route:Router,private messageService:MessageService, private aRoute : ActivatedRoute) { };

  ngOnInit(){


  }

  login(value: any) {
    this.service.login(value).subscribe({
      next: (response) => {
        console.log('reponse', response);
        this.show('success',response.message);
        if(response.status){
          // this.visible=false;
          this.route.navigate(['home']);
        }
      },
      error: (error:HttpErrorResponse) => {
        console.log('error', error.error);
        // this.messageService.add({ severity: 'error', summary: 'API Response' });
        this.show('error',error.error.message);
      }
    })
  }
  show(type:'success' | 'error' ,message:string){
    this.messageService.add({ severity: type, summary: 'API Response', detail: message });
  }
}
