import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  // Google login
  tryGoogleLogin(): void {
    this.authService
      .doGoogleLogin()
      .then(() => {
        console.log('Google login successful');
        this.successRedirect();
      })
      .catch((error) => {
        console.error('Google login failed:', error);
      });
  }

  // Email/password login
  tryEmailLogin(): void {
    this.authService
      .doLogin(this.email, this.password)
      .then(() => {
        console.log('Email login successful');
        this.successRedirect();
      })
      .catch((error) => {
        console.error('Email login failed:', error);
        alert('Login failed. Please check your email and password.'); // Optional: Show error message
      });
  }

  // Redirect after successful login
  successRedirect(): void {
    this.ngZone.run(() => this.router.navigate(['/members']));
  }
}