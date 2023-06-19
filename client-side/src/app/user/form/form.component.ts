import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

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
  selectedCities: string[] = [];

  constructor(private service: ServiceService, private activateRouter: ActivatedRoute, private router: Router) {
   };

  ngOnInit() {
    let id = this.activateRouter.snapshot.paramMap.get('id');
    this.boolean = Boolean(this.activateRouter.snapshot.paramMap.get('boolean'));

    console.log(id, 'fommmm');
    if (id) {
      this.service.getUserById(id).subscribe({
        next: (response) => {
          if (response) {
            const getData = response.Data;
            this.id = getData.id;
            this.name = getData.name;
            this.age = getData.age;
            this.gender = getData.gender;
            console.log('response', response);
          }
        }, error: (error) => {
          console.log('error', error);
        }
      });
    }


  }

  create(value: any) {
    console.log(value);
    // console.log(this.selectedCities);
    this.service.createUser(value).subscribe({
      next: (response) => {
        console.log('response', response);
        this.router.navigate(['home/user/table']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  update(value: any) {
    console.log(value, 'formmmmmmmm');
    this.service.updateUser(this.id, value).subscribe({
      next: (response) => {
        console.log('response', response);
        this.router.navigate(['home/user/table']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}


