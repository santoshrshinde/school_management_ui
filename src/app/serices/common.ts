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
    return this.http.get(this.apiUrl + '/courses');
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

  // =======================
  // ADMISSION METHODS
  // =======================
  getAdmission() {
    return this.http.get(this.apiUrl + '/admission');
  }

  saveAdmission(data: any) {
    return this.http.post(this.apiUrl + '/admission', data);
  }

  getAdmissionById(id: number) {
    return this.http.get(`${this.apiUrl}/admission/${id}`);
  }

  updateAdmission(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/admission/${id}`, data);
  }

  deleteAdmission(id: number) {
    return this.http.delete(`${this.apiUrl}/admission/${id}`);
  }

  // =======================
  // SCHOOLBUS METHODS
  // =======================
  getSchoolbus() {
    return this.http.get(this.apiUrl + '/schoolbus');
  }

  saveSchoolbus(data: any) {
    return this.http.post(this.apiUrl + '/schoolbus', data);
  }

  getSchoolbusById(id: number) {
    return this.http.get(`${this.apiUrl}/schoolbus/${id}`);
  }

  updateSchoolbus(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/schoolbus/${id}`, data);
  }

  deleteSchoolbus(id: number) {
    return this.http.delete(`${this.apiUrl}/schoolbus/${id}`);
  }

  // =======================
  // STUDENTBUS METHODS
  // =======================
  getStudentbus() {
    return this.http.get(this.apiUrl + '/studentbus');
  }

  saveStudentbus(data: any) {
    return this.http.post(this.apiUrl + '/studentbus', data);
  }

  getStudentbusById(id: number) {
    return this.http.get(`${this.apiUrl}/studentbus/${id}`);
  }

  updateStudentbus(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/studentbus/${id}`, data);
  }

  deleteStudentbus(id: number) {
    return this.http.delete(`${this.apiUrl}/studentbus/${id}`);
  }

  // =======================
  // FEES METHODS
  // =======================
  getFees() {
    return this.http.get(this.apiUrl + '/fees');
  }

  saveFees(data: any) {
    return this.http.post(this.apiUrl + '/fees', data);
  }

  getFeesById(id: number) {
    return this.http.get(`${this.apiUrl}/fees/${id}`);
  }

  updateFees(id: number, fees: any) {
    return this.http.put(`${this.apiUrl}/fees/${id}`, fees);
  }

  deleteFees(id: number) {
    return this.http.delete(`${this.apiUrl}/fees/${id}`);
  }
}
