
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-signin',
  templateUrl: "./signin.component.html"
})

export class SigninComponent implements OnInit {
 myForm: FormGroup;

 constructor(private authService: AuthService, private router: Router){}

 onSubmit(){
   console.log('form', this.myForm);
   const user = new User(this.myForm.value.password,this.myForm.value.email);
   console.log('user', user);
   this.authService.signin(user)
   .subscribe(
     data => {
       localStorage.setItem('token', data.token);
       localStorage.setItem('userId', data.UserId);
       this.router.navigateByUrl('/');
     },
     error => console.error(error)
   );
   this.myForm.reset();
 }

 ngOnInit(){
   this.myForm = new FormGroup({
     email: new FormControl(null, [Validators.required, Validators.email]),
     password: new FormControl(null, Validators.required)
   });
 }
}
