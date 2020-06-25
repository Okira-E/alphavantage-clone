import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string = "http://localhost:3000";
  private token: string;
  private apiKey = new BehaviorSubject<string>(this.token);
  private currentApiKey = this.apiKey.asObservable();
  private errorMessage: string;
  private errorMessageListener = new BehaviorSubject<string>(this.errorMessage);
  private currentErrorMessage = this.errorMessageListener.asObservable();

  constructor(private http: HttpClient) { }

  registerUser(email): void {
    this.http.post<{token: string}>(this.url + "/api/users/register", {
      email: email
    }).subscribe(res => {
      this.apiKey.next(res.token);
    }, err => {
      this.http.post<{token: string}>(this.url + "/api/users/getToken", {email}).subscribe(res => {
        this.errorMessageListener.next("User already exists, here is the api key: " + res.token);
      });
    });
  }

  getToken() {
    return this.currentApiKey;
  }

  getErrorMessage() {
    return this.currentErrorMessage;
  }
}
