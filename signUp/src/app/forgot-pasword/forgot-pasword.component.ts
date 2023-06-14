import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.scss']
})
export class ForgotPaswordComponent {

  password: string = '';
  confirmPassword: string = '';

  constructor() { }

  resetPassword(value: any) {
    console.log('value', value);
  }

}
