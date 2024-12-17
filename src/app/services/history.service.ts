import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface HistoryEntry {
  action: string; // e.g., 'Created Folder', 'Deleted File'
  target: string; // File or folder path
  type: 'file' | 'folder'; // Type of target: file or folder
  timestamp: string; // Date and time
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: HistoryEntry[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const savedHistory = await this.storage.get('actionHistory');
    this.history = savedHistory || [];
  }

  async logAction(action: string, target: string, type: 'file' | 'folder') {
    target = target.replace("1", "Your Workspace").toString()
    const entry: HistoryEntry = {
      action,
      target,
      type, // Specify whether it's a file or folder
      timestamp: new Date().toISOString(),
    };

    this.history.unshift(entry);
    await this.storage.set('actionHistory', this.history);
    console.log('Action Logged:', entry);
  }

  async getHistory(): Promise<HistoryEntry[]> {
    return this.history;
  }

  async clearHistory() {
    this.history = [];
    await this.storage.set('actionHistory', this.history);
  }

  async setHistory(history: HistoryEntry[]) {
    await this.storage.set('actionHistory', history);
  }
}
