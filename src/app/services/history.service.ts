import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


export interface HistoryEntry {
  userId: number; // User ID for tracking
  action: string; // e.g., 'Created Folder', 'Deleted File'
  target: string; // File or folder path
  type: 'file' | 'folder'; // Type of target: file or folder
  timestamp: string; // Date and time
}


@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private storageKeyPrefix = 'actionHistory_'; // Prefix for history keys

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // Log action for a specific user
  async logAction(
    userId: number,
    action: string,
    target: string,
    type: 'file' | 'folder'
  ) {
    target = '~' + target.substring(1);

    const entry: HistoryEntry = {
      userId,
      action,
      target,
      type,
      timestamp: new Date().toISOString(),
    };

    const history = await this.getHistory(userId);
    history.unshift(entry); // Add the new entry at the start

    await this.storage.set(this.getStorageKey(userId), history);
    console.log('Action Logged:', entry);
  }

  // Get history for a specific user
  async getHistory(userId: number): Promise<HistoryEntry[]> {
    const history = await this.storage.get(this.getStorageKey(userId));
    return history || [];
  }

  // Clear history for a specific user
  async clearHistory(userId: number) {
    await this.storage.set(this.getStorageKey(userId), []);
  }

  // Update history for a specific user
  async setHistory(userId: number, history: HistoryEntry[]) {
    await this.storage.set(this.getStorageKey(userId), history);
  }

  // Utility: Generate storage key for a user
  private getStorageKey(userId: number): string {
    return `${this.storageKeyPrefix}${userId}`;
  }
}
