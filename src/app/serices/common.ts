import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000'; // Flask API base URL

  // =======================
  // STUDENT METHODS
  // =======================
  saveStudent(data: any) {
    return this.http.post(this.apiUrl + '/students', data);
  }

  getStudent() {
    return this.http.get(this.apiUrl + '/students');
  }

  getStudentById(id: number) {
    return this.http.get(`${this.apiUrl}/students/${id}`);
  }

  updateStudent(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/students/${id}`, data);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/students/${id}`);
  }

  // =======================
  // TEACHER METHODS
  // =======================
  getTeacher() {
    return this.http.get(this.apiUrl + '/teachers');
  }

  saveTeacher(data: any) {
    return this.http.post(this.apiUrl + '/teachers', data);
  }

  getTeacherById(id: number) {
    return this.http.get(`${this.apiUrl}/teachers/${id}`);
  }

  updateTeacher(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/teachers/${id}`, data);
  }

  deleteTeacher(id: number) {
    return this.http.delete(`${this.apiUrl}/teachers/${id}`);
  }

  // =======================
// COURSE METHODS
// =======================
getCourse() {
  return this.http.get(this.apiUrl + '/courses');  // plural
}

saveCourse(data: any) {
  return this.http.post(this.apiUrl + '/courses', data);
}

getCourseById(id: number) {
  return this.http.get(`${this.apiUrl}/courses/${id}`);
}

updateCourse(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/courses/${id}`, data);
}

deleteCourse(id: number) {
  return this.http.delete(`${this.apiUrl}/courses/${id}`);
}

}
