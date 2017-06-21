import { Component } from "@angular/core";
import { AuthService } from './auth.service';

@Component({
 selector: 'app-authentication',
 template: ``
})

export class AuthenticationComponent {
  constructor(private authService: AuthService){}

}
