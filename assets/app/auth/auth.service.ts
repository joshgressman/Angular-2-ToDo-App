
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";

@Injectable()
export class AuthService {

 constructor(private http: Http){}

 //** USER SIGN UP **
 signup(user: User){
   const body = JSON.stringify(user);
   const headers = new Headers({'Content-Type':'application/json'});
   return this.http.post('http://localhost:3000/user', body, {headers: headers})
   .map((response: Response) => response.json())
           .catch((error: Response) => {
               return Observable.throw(error.json());
           });
 }

 //** END USER SIGN UP

 //*** USER SIGNIN *** ///
 signin(user: User){
   const body = JSON.stringify(user);
   const headers = new Headers({'Content-Type': 'application/json'});
   return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
   .map((response: Response) => response.json())
   .catch((error: Response) => {
                return Observable.throw(error.json());
            });
 } //*** USER SIGNIN END ***///

//**** LOGOUT USER ****//
logout(){
  localStorage.clear();
} //*** END LOGOUT *** //

//*** CHECKS FOR TOKEN FOR THE NAV TABS

isLoggedIn(){
  return localStorage.getItem('token') !== null;
}

}
