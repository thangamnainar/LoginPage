import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { };

  postData(data: any) {
    console.log('service', data);
    const url = 'http://localhost:3000/adduser';
    const nestUrl = 'http://localhost:3000/user/createUser';
    return this.http.post<any>(nestUrl, data);
  }
  verify(otp: any, email: any) {
    console.log('service', otp);
    const url = 'http://localhost:3000/verify';
    const nestUrl = 'http://localhost:3000/user/verifyOtp';
    return this.http.put<any>(nestUrl, { verifyotp: otp, email: email });
  }

  login(data: any) {
    console.log('service', data);
    const nestUrl = 'http://localhost:3000/user/login';
    const url = 'http://localhost:3000/login';
    return this.http.post<any>(nestUrl, data);
  }

  //forgot password

  getMail(email: any) {
    const Url = 'http://localhost:3000/user/getMail';
    return this.http.post<any>(Url, email);
  }

  verifyMailOtp(otp: any,email:any) {
    const Url = 'http://localhost:3000/user/verifyOtpForgotPassword';
    return this.http.put<any>(Url, {verifyotp:otp,email:email});
  }

  resetPassword(value: any,email:any,otp:any) {
    const Url = 'http://localhost:3000/user/resetPassword';
    console.log({password:value.password, confirm_password:value.confirm_password, email:email, otp:otp},'service');    
    return this.http.put<any>(Url, {password:value.password,email:email,otp:otp});
  }

  reSendMail(email: any){
    const Url = 'http://localhost:3000/user/reSendMail';
    console.log({email:email},'service');    
    return this.http.put<any>(Url, {email:email});
  }

  //crud operation

  createUser(postData: any) {
    const Url = 'http://localhost:2000/crud/createUser';
    return this.http.post<any>(Url, postData);
  }

  getUsers() {
    const Url = 'http://localhost:2000/crud/users';
    return this.http.get<any>(Url);
  }

  getUserById(id: string | null) {
    const Url = ' http://localhost:2000/crud/user/';
    return this.http.get<any>(Url + id);
  }

  updateUser(updateData: any) {
    const Url = 'http://localhost:2000/crud/updateUser';
    return this.http.put<any>(Url, updateData);
  }

  deleteUser(deleteData: any) {
    const Url = 'http://localhost:2000/crud/deleteUser';
    return this.http.delete<any>(Url, deleteData);
  }



}
export interface post {
  email: string;
  password: string;
}