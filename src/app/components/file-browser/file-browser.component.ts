import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { File } from '../../models/api-results.model';
import { FileService } from '../../services/file.service';
import {HistoryService} from "../../services/history.service";

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss'],
})
export class FileBrowserComponent implements OnChanges {
  @Input() fileTree: any = {};
  @Input() files: File[] = [];
  @Input() depth: number = 0; // Indentation
  @Input() userId: number = 1; // User ID for root-level uploads

  selectedFile: globalThis.File | null = null;

  constructor(private fileService: FileService, private historyService: HistoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['files'] && this.files && this.files.length > 0) {
      this.fileTree = {
        'Your Workspace': this.buildTree(this.files),
      };
      console.log('File Tree Built:', this.fileTree);
    }
  }

  buildTree(files: File[]): any {
    const tree: any = {};

    files.forEach((file) => {
      const parts: string[] = file.fileName.split('/');
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = index === parts.length - 1 ? file : {};
        }
        current = current[part];
      });
    });

    return tree;
  }

  // Create a new folder
  createFolder(folderPath: string) {
    const folderName = prompt('Enter the new folder name:');
    if (!folderName) {
      console.warn('Folder creation cancelled');
      return;
    }

    let cleanPath = folderPath.replace(/^Your Workspace\/?/, '').trim();
    const finalPath = cleanPath
      ? `${this.userId}/${cleanPath}/${folderName}/`
      : `${this.userId}/${folderName}/`;

    console.log(`Creating folder with placeholder file: ${finalPath}`);

    this.fileService.createFolder(finalPath).subscribe({
      next: (response) => {
        if (response.success) {
          console.log(`Folder created successfully: ${folderName}`);
          this.historyService.logAction('Created Folder', finalPath, 'folder');
        } else {
          console.error('Failed to create folder');
        }
      },
      error: (err) => console.error('Error creating folder:', err),
    });
  }

  triggerFileInput(folderPath: string) {
    const inputId = `file-input-${folderPath || 'root'}`.replace(/\//g, '-');
    const input = document.getElementById(inputId);
    if (input) input.click();
  }

  onFileSelected(event: any, folderPath: string) {
    const file = event.target.files[0];
    if (file) {
      let cleanPath = folderPath.replace(/^Your Workspace\/?/, '').trim();
      cleanPath = cleanPath ? `${this.userId}/${cleanPath}/${file.name}` : `${this.userId}/${file.name}`;

      this.fileService.uploadFile(file, cleanPath).subscribe({
        next: (response) =>
        {
          console.log(`File uploaded: ${cleanPath}`, response)
          this.historyService.logAction('Uploaded File', cleanPath, 'file');
          },
        error: (err) => console.error('File upload failed:', err),
      });
    }
  }

  deleteItem(path: string, isFile: boolean) {
    const cleanPath = path.replace(/^Your Workspace\/?/, '').trim(); // Remove 'Your Workspace' only once
    const finalPath = `${this.userId}/${cleanPath}`;

    console.log(`Deleting: ${finalPath}`); // Debug output for path verification

    this.fileService.deleteFile(finalPath).subscribe({
      next: (response) => {
        if (response.success) {
          this.historyService.logAction(isFile ? 'Deleted File' : 'Deleted Folder', finalPath, isFile ? 'file' : 'folder');
          console.log(`${isFile ? 'File' : 'Folder'} deleted successfully: ${finalPath}`);
        } else {
          console.error('Failed to delete:', response);
        }
      },
      error: (err) => {
        console.error('Error during deletion:', err);
      },
    });
  }

  openFile(fileUrl: string) {
    console.log(`Opening file: ${fileUrl}`);
    window.open(fileUrl, '_blank');
  }

  isFile(node: any): boolean {
    return node && typeof node.fileUrl === 'string';
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
