import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public token: string;
  public message: string;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  registerUser(form: NgForm): void {
    if (!(form.value.email.length === 0)) {
      this.userService.registerUser(form.value.email);
      this.userService.getToken().subscribe((token) => (this.token = token));
      this.userService.getErrorMessage().subscribe((message) => {
        if (message) {
          this.message = message;
        }
      });
    }
  }
}
