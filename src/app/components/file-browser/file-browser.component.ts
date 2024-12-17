import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent {
  @Input() fileTree: any = {}; // Input to receive dynamic file tree data
  selectedFile: File | null = null;

  // Handle "Create Folder" Action
  createFolder(folderName: string) {
    console.log(`Creating a new folder inside ${folderName}`);
    // Add backend/API integration here for folder creation
  }

  // Handle File Selection
  onFileSelected(event: any, folderName: string) {
    this.selectedFile = event.target.files[0];
    console.log(`File selected for ${folderName}:`, this.selectedFile);
  }

  // Handle "Upload File" Action
  uploadFile(folderName: string) {
    if (this.selectedFile) {
      console.log(`Uploading file '${this.selectedFile.name}' to ${folderName}`);
      // Add backend/API integration here for file upload
    } else {
      console.error('No file selected for upload');
    }
  }

  // Handle "Open File" Action
  openFile(filePath: string) {
    console.log(`Opening file: ${filePath}`);
    // Add logic to display/download the file
  }

  // Helper method to check if a node is a file
  isFile(node: any): boolean {
    return node && node.fileUrl !== undefined;
  }

  // Helper method to get object keys
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
