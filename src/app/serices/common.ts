import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private http = inject(HttpClient);

  saveStudent(data: any) {
    return this.http.post('http://localhost:5000/students', data);
  }

  getStudent() {
    return this.http.get('http://localhost:5000/students');
  }
}
