import { Component, OnInit } from '@angular/core';
import { HistoryService, HistoryEntry } from '../services/history.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  actionHistory: HistoryEntry[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory() {
    this.actionHistory = await this.historyService.getHistory();
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  async deleteHistory() {
    await this.historyService.clearHistory();
    this.actionHistory = [];
  }

  async deleteItem(index: number) {
    this.actionHistory.splice(index, 1); // Remove the item from the array
    await this.historyService.setHistory(this.actionHistory); // Update persistent storage
  }
}
