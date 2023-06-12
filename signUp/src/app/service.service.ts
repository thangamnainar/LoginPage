import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { };
  
  postData(data:any){
    console.log('service',data);
    const url = 'http://localhost:3000/adduser';
    return this.http.post<any>(url,data);
  }
  verify(otp:any){
    console.log('service',otp);    
    return this.http.put<any>("http://localhost:3000/verify",otp);
  }

  login(data:any){
    console.log('service',data);
    return this.http.post<any>("http://localhost:3000/login",data);
  }

}
export interface post{
  email:string;
  password:string;
}