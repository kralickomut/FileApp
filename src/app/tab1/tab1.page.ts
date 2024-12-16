import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  selectedFile: File | null = null;

  constructor() {}

  // Create a New Folder
  createFolder(folderPath: string) {
    const folderName = prompt('Enter the name of the new folder:');
    if (folderName) {
      const newPath = `${folderPath}/${folderName}/`;

        alert('Folder created successfully');
    }
  }

  // File Selection Event
  onFileSelected(event: Event, folderPath: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Upload File
  uploadFile(folderPath: string) {
    if (this.selectedFile) {
      const filePath = `${folderPath}/${this.selectedFile.name}`;
        alert('File uploaded successfully');
        this.selectedFile = null;
    } else {
      alert('Please select a file first.');
    }
  }

  // Open File
  openFile(filePath: string) {
    alert(`Opening file: ${filePath}`);
    console.log('Opening file:', filePath);
  }
}
