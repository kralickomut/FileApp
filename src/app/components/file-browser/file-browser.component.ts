import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { File } from '../../models/api-results.model';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss'],
})
export class FileBrowserComponent implements OnChanges {
  @Input() fileTree: any = {}; // <--- Fix here: Input for the dynamic file tree
  @Input() files: File[] = []; // Input array of files

  selectedFile: File | null = null;

  // Detect changes to 'files' input and rebuild the tree
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['files'] && this.files && this.files.length > 0) {
      this.fileTree = {
        'Your Workspace': this.buildTree(this.files),
      };
      console.log('Rebuilt File Tree:', this.fileTree);
    }
  }

  buildTree(files: File[]): any {
    const tree: any = {};

    files.forEach((file) => {
      const parts: string[] = file.fileName.split('/'); // Split file path into parts
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = index === parts.length - 1 ? file : {}; // Create folder or file
        }
        current = current[part];
      });
    });

    console.log('Built File Tree:', tree); // Debug output
    return tree;
  }

  createFolder(folderName: string) {
    console.log(`Creating folder in: ${folderName}`);
  }

  onFileSelected(event: any, folderName: string) {
    this.selectedFile = event.target.files[0];
    console.log(`File selected for ${folderName}:`, this.selectedFile);
  }

  uploadFile(folderName: string) {
    if (this.selectedFile) {
      console.log(`Uploading file '${this.selectedFile.fileName}' to ${folderName}`);
    } else {
      console.error('No file selected');
    }
  }

  openFile(filePath: string) {
    console.log(`Opening file: ${filePath}`);
  }

  isFile(node: any): boolean {
    return node && typeof node.fileUrl === 'string';
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
