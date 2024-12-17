import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { File, ApiResult } from '../models/api-results.model';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-tab1',
    templateUrl: './tab1.page.html',
    styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
    files: File[] = []; // File list fetched from API
    loading: boolean = true; // Loading indicator
    userId: number | undefined

    constructor(private fileService: FileService, private authService: AuthService) {}

    ngOnInit() {
        const loggedId = this.authService.getUserProfile()?.Id as number | undefined;
        this.userId = loggedId
        this.loadFiles(loggedId!);
    }

    // Fetch files from API
    loadFiles(userId: number) {
        this.loading = true; // Start loading
        this.fileService.listUserFiles(userId).subscribe(
            (response: ApiResult<File[]>) => {
                if (response.success) {
                    this.files = response.result; // Update file list
                } else {
                    this.files = [];
                    console.error('Failed to fetch files:', response);
                }
                this.loading = false; // Stop loading after data is fetched
            },
            (error) => {
                console.error('Error fetching files:', error);
                this.files = [];
                this.loading = false; // Stop loading on error
            }
        );
    }

    // Create workspace button handler
    createWorkspace() {
        if (!this.userId) {
            console.error('User ID is not available.');
            return;
        }

        this.fileService.createFolder(`${this.userId}/`).subscribe((result) => {
            if (result.success) {
                console.log('Workspace created successfully');
                this.loadFiles(this.userId as number);
            } else {
                console.error('Failed to create workspace:', result);
            }
        }, (error) => {
            console.error('Error while creating workspace:', error);
        });
    }


}
