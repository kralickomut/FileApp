import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.page.html',
  styleUrls: ['./file-viewer.page.scss'],
})
export class FileViewerPage implements OnInit {
  filePath: string | null = null;
  fileName: string = '';
  fileContent: string = '';
  safeFileUrl: SafeResourceUrl | null = null;


  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filePath = params['file'];
      this.fileName = this.filePath?.split('/').pop() as string


      if (this.isTextFile(this.fileName)) {
        this.loadTextFile(this.filePath!);
      }

      if (this.isPdfFile(this.fileName)) {
        this.safeFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.filePath as string);
      }
    });
  }

  // Check if the file is an image
  isImageFile(fileName: string): boolean {
    return /\.(png|jpg|jpeg|gif)$/i.test(fileName);
  }

  // Check if the file is a PDF
  isPdfFile(fileName: string): boolean {
    return /\.pdf$/i.test(fileName);
  }

  // Check if the file is a text file
  isTextFile(fileName: string): boolean {
    return /\.txt$/i.test(fileName);
  }

  // Fetch and display content for text files
  loadTextFile(filePath: string): void {
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => (this.fileContent = data))
      .catch((error) => {
        console.error('Error loading text file:', error);
        this.fileContent = 'Failed to load text file content.';
      });
  }

  closeView() {
    this.router.navigate(['/tabs'])
  }
}
