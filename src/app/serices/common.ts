import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/students'; // Define base URL

  saveStudent(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  getStudent() {
    return this.http.get(this.apiUrl);
  }

  getStudentById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateStudent(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
