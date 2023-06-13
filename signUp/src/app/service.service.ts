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
    const nestUrl='http://localhost:3000/user/createUser';
    return this.http.post<any>(nestUrl,data);
  }
  verify(otp:any,email:any){
    console.log('service',otp);    
    const url = 'http://localhost:3000/verify';
    const nestUrl='http://localhost:3000/user/verifyOtp';
    return this.http.put<any>(nestUrl,{ verifyotp: otp, email: email });
  }

  login(data:any){
    console.log('service',data);
    const nestUrl='http://localhost:3000/user/login';
    const url = 'http://localhost:3000/login';
    return this.http.post<any>(nestUrl,data);
  }

}
export interface post{
  email:string;
  password:string;
}