import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-shared-menu',
  templateUrl: './shared-menu.component.html',
  styleUrls: ['./shared-menu.component.scss'],
})
export class SharedMenuComponent implements OnInit{
  isLogged: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the login state observable
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
    });
  }

}
