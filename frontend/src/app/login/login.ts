import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);

  // added signals for two-way-style binding
  username = signal('');
  password = signal('');

  login() {
    // pass the current signal values into the login call
    this.authService.login(this.username(), this.password());
    if (this.authService.authenticated()) {
      this.router.navigate(["gest"]);
    } else {
      alert("username and/or password is incorrect");
      this.username.set("");
      this.password.set("");
    }
  }
}