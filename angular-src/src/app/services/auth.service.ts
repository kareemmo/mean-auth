import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User} from './user';
//import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    userurl="http//localhost:7000/users/register";
  
    authToken:any;
    user:any;
  constructor(private http:HttpClient) { }
  registerUser(user){
    return this.http.post<User>(this.userurl, user, httpOptions)
    .pipe(
      //catchError(this.handleError('addHero', hero))
    );
    
  }
}
