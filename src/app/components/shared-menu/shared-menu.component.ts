import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-shared-menu',
  templateUrl: './shared-menu.component.html',
  styleUrls: ['./shared-menu.component.scss'],
})
export class SharedMenuComponent implements OnInit{
  isLogged: boolean = false;

  constructor(private authService: AuthService, private menuController: MenuController) {}

  ngOnInit() {
    // Subscribe to the login state observable
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
    });
  }

  closeMenu() {
    // Close the menu
    this.menuController.close();
  }

}
