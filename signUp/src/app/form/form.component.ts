import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  name: string = '';
  age!: number;
  gender: string = '';
  boolean: boolean = false;
  id: any;

  constructor(private service: ServiceService,private activateRouter:ActivatedRoute,private router:Router) { };

  ngOnInit(){
    let id = this.activateRouter.snapshot.paramMap.get('id');
    console.log(id,'fommmm');
    
    this.service.getUserById(id).subscribe({
      next: (response) => {
        if(response) {
          const getData = response.Data;
          console.log('response',getData.name);
        }
      },error: (error) => {
        console.log('error',error);
      }
        
    });
  }

  create(value: any) {
    console.log(value);
    this.service.createUser(value).subscribe({
      next: (response) => {
        console.log('response',response);
        this.router.navigate(['table']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  

  update(){
  }

}
