import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = ''
  username: string = ''
  password: string = ''
  errorMessage: string = ''


  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.username && this.password && this.name) {
      this.authService.register(this.name, this.username, this.password).subscribe(
        success => {
          if (success) {
            // Remove focus from the active element
            (document.activeElement as HTMLElement)?.blur();
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'User already exists';
          }
        },
        error => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Name, username and password are required.';
    }
  }

}
