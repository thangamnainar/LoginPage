import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  getUsers: any ;

  constructor(private service: ServiceService, private router:Router) { };

  ngOnInit(){
    this.service.getUsers().subscribe({
      next: (response) => {
        this.getUsers = response.Data;
        // console.log(this.getUsers);
        console.log('response', response);
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }


  edit(id:any){
    console.log(id);
    this.router.navigate(['form',id]);

  }

  delete(value:any){}
}
