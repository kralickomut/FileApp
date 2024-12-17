import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user-profile.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userProfile: UserProfile | null = null;
  formattedExpiry: string = 'N/A';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userProfile = this.authService.getUserProfile();

    // Precompute the formatted expiry date
    if (this.userProfile?.Exp) {
      const expiryDate = new Date(this.userProfile.Exp * 1000);
      this.formattedExpiry = expiryDate.toLocaleString(); // Localized date and time string
    }

    console.log('User Profile:', this.userProfile);
  }

  logout(): void {
    this.authService.logout();
  }
}
