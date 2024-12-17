import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiResult, File} from "../models/api-results.model";

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = environment.apiUrl + '/File'

  constructor(private http: HttpClient) {}

  listUserFiles(userId: number): Observable<ApiResult<File[]>> {
    const token = localStorage.getItem('auth-token'); // Retrieve token from storage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add Bearer token
    });

    return this.http.get<ApiResult<File[]>>(`${this.apiUrl}/List?userId=${userId}`, { headers });
  }
}
