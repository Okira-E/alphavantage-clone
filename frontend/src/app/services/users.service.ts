import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = 'http://localhost:3200';
  private apiKey: string = '';
  private apiKeyListener = new BehaviorSubject<string>(this.apiKey); // Listens to whenever the value for apiKey actually changes
  private currentApiKey = this.apiKeyListener.asObservable();
  private errorMessage: string = '';
  private errorMessageListener = new BehaviorSubject<string>(this.errorMessage);
  private currentErrorMessage = this.errorMessageListener.asObservable();

  constructor(private http: HttpClient) {}

  public registerUser(email): void {
    this.http
      .post<{ token: string }>(this.url + '/api/users/register', {
        email,
      })
      .subscribe(
        (res) => {
          this.apiKeyListener.next(res.token);
        },
        (err) => {
          this.http
            .post<{ token: string }>(this.url + '/api/users/getToken', {
              email,
            })
            .subscribe((res) => {
              this.errorMessageListener.next(
                'User already exists, here is the api key: ' + res.token
              );
            });
        }
      );
  }

  public getToken() {
    return this.currentApiKey;
  }

  public getErrorMessage() {
    return this.currentErrorMessage;
  }
}
