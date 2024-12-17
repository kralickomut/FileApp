import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import {ApiResult, File} from "../models/api-results.model";


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  fileTree: any = {}; // Dynamic file tree

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.loadFiles(1); // Load files for user ID 1
  }

  // Fetch files and build file tree
  loadFiles(userId: number) {
    this.fileService.listUserFiles(userId).subscribe(
        (response: ApiResult<File[]>) => {
          if (response.success) {
            this.fileTree = this.buildTree(response.result);
            console.log('Dynamic File Tree:', this.fileTree);
          } else {
            console.error('Failed to fetch files');
          }
        },
        (error) => {
          console.error('Error fetching files:', error);
        }
    );
  }

  // Convert file list into hierarchical tree structure
  buildTree(files: File[]): any {
    const tree: any = {};
    files.forEach((file) => {
      const parts: string[] = file.fileName.split('/'); // Split file path into parts
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
}
