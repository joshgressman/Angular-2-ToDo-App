import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
    input.ng-invalid.ng-touched {
    border: 1px solid red;
    }
    `]
})

export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    console.log(this.myForm);
   const user = new User(
     this.myForm.value.password,
     this.myForm.value.email,
     this.myForm.value.username
   );
   this.authService.signup(user)
     .subscribe(
       data => console.log('data', data),
       error => console.log('error', error)
     );
     this.myForm.reset();
     this.router.navigateByUrl('auth/signin');
  }

 //Initalive the for group upon load and create custom validation
 ngOnInit(){
  this.myForm = new FormGroup({
   password: new FormControl(null, Validators.minLength(6)),
   email: new FormControl(null, [
     Validators.required,
     Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
   ]),
    username: new FormControl(null, Validators.required)
 });
 }

}
