import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000'; // Define base URL

  saveStudent(data: any) {
    return this.http.post(this.apiUrl + 'students', data);
  }

  getStudent() {
    return this.http.get(this.apiUrl + '/students');
  }

  getStudentById(id: number) {
    return this.http.get(`${this.apiUrl + '/students'}/${id}`);
  }

  updateStudent(id: number, data: any) {
    return this.http.put(`${this.apiUrl + '/students'}/${id}`, data);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl + '/students'}/${id}`);
  }

  getTeacher() {
    return this.http.get(this.apiUrl + '/teachers');
  }
}
