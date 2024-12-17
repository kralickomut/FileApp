import { Component, OnInit } from '@angular/core';
import { HistoryService, HistoryEntry } from '../services/history.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  actionHistory: HistoryEntry[] = [];
  userId: number | undefined;

  constructor(
    private historyService: HistoryService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.userId = this.authService.getUserProfile()?.Id as number | undefined; // Retrieve user ID
    if (this.userId) {
      await this.loadHistory();
    } else {
      console.error('User ID not found.');
    }
  }

  // Load history for the current user
  async loadHistory() {
    if (this.userId) {
      this.actionHistory = await this.historyService.getHistory(this.userId);
    }
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  // Clear history for the current user
  async deleteHistory() {
    if (this.userId) {
      await this.historyService.clearHistory(this.userId);
      this.actionHistory = [];
    }
  }

  // Delete a single history entry for the current user
  async deleteItem(index: number) {
    if (this.userId !== undefined) {
      this.actionHistory.splice(index, 1); // Remove the item from the array
      await this.historyService.setHistory(this.userId, this.actionHistory); // Update persistent storage
    }
  }
}
