import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResult, File as AppFile } from '../models/api-results.model'; // Alias your custom File

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = environment.apiUrl + '/File';

  constructor(private http: HttpClient) {}

  listUserFiles(userId: number): Observable<ApiResult<AppFile[]>> {
    const token = localStorage.getItem('auth-token'); // Retrieve token from storage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add Bearer token
    });

    return this.http.get<ApiResult<AppFile[]>>(`${this.apiUrl}/List?userId=${userId}`, { headers });
  }

  uploadFile(file: globalThis.File, path: string): Observable<string> {
    const formData = new FormData();

    // Append the file and path to the form data
    formData.append('file', file, file.name); // Explicitly using browser's File API
    formData.append('path', path); // Path where the file will be uploaded

    const token = localStorage.getItem('auth-token'); // Retrieve token from storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add Bearer token
    });

    return this.http.post<string>(`${this.apiUrl}/Upload`, formData, { headers });
  }

  deleteFile(path: string) : Observable<ApiResult<boolean>> {
    const token = localStorage.getItem('auth-token'); // Retrieve token from storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add Bearer token
    });

    return this.http.delete<ApiResult<boolean>>(`${this.apiUrl}/Delete?path=${path}`, { headers });
  }

  createFolder(path: string): Observable<ApiResult<boolean>> {
    const token = localStorage.getItem('auth-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Explicitly set the content type
    });

    return this.http.post<ApiResult<boolean>>(`${this.apiUrl}/CreateFolder`, JSON.stringify(path), { headers });
  }

}


// TODO:
// Vyhledávání, zobrazit soubory, historie (smazáno, přidáno)
