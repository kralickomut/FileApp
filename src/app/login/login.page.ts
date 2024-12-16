import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

    onLogin() {
        if (this.username && this.password) {
            this.authService.login(this.username, this.password).subscribe(
                success => {
                    if (success) {
                        // Remove focus from the active element
                        (document.activeElement as HTMLElement)?.blur();

                        // Navigate to tabs
                        this.router.navigate(['/tabs']);
                    } else {
                        this.errorMessage = 'Invalid username or password.';
                    }
                },
                error => {
                    this.errorMessage = 'Login failed. Please try again.';
                    console.error(error);
                }
            );
        } else {
            this.errorMessage = 'Username and password are required.';
        }
    }
}
