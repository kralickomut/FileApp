import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { File, ApiResult } from '../models/api-results.model';

@Component({
    selector: 'app-tab1',
    templateUrl: './tab1.page.html',
    styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
    files: File[] = []; // Raw list of files fetched from API

    constructor(private fileService: FileService) {}

    ngOnInit() {
        this.loadFiles(1); // Load files for user ID 1
    }

    // Fetch files from API
    loadFiles(userId: number) {
        this.fileService.listUserFiles(userId).subscribe(
            (response: ApiResult<File[]>) => {
                if (response.success) {
                    this.files = response.result; // Pass raw file list to FileBrowserComponent
                } else {
                    console.error('Failed to fetch files:', response);
                }
            },
            (error) => {
                console.error('Error fetching files:', error);
            }
        );
    }
}
