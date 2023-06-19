import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

interface IBike {
  id:number,
  bike_name:string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myForm!: FormGroup;

  name: string = '';
  age!: number;
  gender: string = '';
  boolean: boolean = false;
  id: any;
  bikes:Array<IBike> = [];

  constructor(private service: ServiceService, private activateRouter: ActivatedRoute, private router: Router,private fb:FormBuilder) {
   };

  ngOnInit() {

    this.myForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern('^[a-zA-Z]+$')]],
      age: ['', [Validators.required,Validators.maxLength(3)]],
      bikes:['',[Validators.required]],
      gender:['',[Validators.required]]
    });

    // checbox data

    this.service.getCheckBoxData().subscribe({
      next: (response) => {
        console.log('bikesssssssssssssssssss', response.Data);
        this.bikes = response.Data;
      }, error: (error: any) => {
        console.log('error', error);
      }
    })
    

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
            // this.myForm.patchValue(getData)

            console.log('response', response);
          }
        }, error: (error) => {
          console.log('error', error);
        }
      });
    }


  }

  create() {
    console.log(this.myForm.value);
    // console.log(this.selectedCities);
    this.service.createUser(this.myForm.value).subscribe({
      next: (response) => {
        console.log('response', response);
        this.router.navigate(['home/user/table']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  update() {
    // console.log(value, 'formmmmmmmm');
    // this.service.updateUser(this.id, value).subscribe({
    //   next: (response) => {
    //     console.log('response', response);
    //     this.router.navigate(['home/user/table']);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }
}


