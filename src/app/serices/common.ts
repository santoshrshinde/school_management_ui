import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000'; // Flask API base URL

  // =======================
  // STUDENT METHODS
  // =======================
  saveStudent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, data);
  }

  getStudent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/${id}`);
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/students/${id}`, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${id}`);
  }

  // =======================
  // TEACHER METHODS
  // =======================
  getTeacher(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teachers`);
  }

  saveTeacher(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/teachers`, data);
  }

  getTeacherById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/teachers/${id}`);
  }

  updateTeacher(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/teachers/${id}`, data);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/teachers/${id}`);
  }

  // =======================
  // COURSE METHODS
  // =======================
  getCourse(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses`);
  }

  saveCourse(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses`, data);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/${id}`);
  }

  updateCourse(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/courses/${id}`, data);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${id}`);
  }

  // =======================
  // ADMISSION METHODS
  // =======================
  getAdmission(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admission`);
  }

  saveAdmission(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admission`, data);
  }

  getAdmissionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admission/${id}`);
  }

  updateAdmission(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admission/${id}`, data);
  }

  deleteAdmission(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admission/${id}`);
  }

  // =======================
  // SCHOOLBUS METHODS
  // =======================
  getSchoolbus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schoolbus`);
  }

  saveSchoolbus(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schoolbus`, data);
  }

  getSchoolbusById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/schoolbus/${id}`);
  }

  updateSchoolbus(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/schoolbus/${id}`, data);
  }

  deleteSchoolbus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/schoolbus/${id}`);
  }

  // =======================
  // STUDENTBUS METHODS
  // =======================
  getStudentbus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/studentbus`);
  }

  saveStudentbus(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/studentbus`, data);
  }

  getStudentbusById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/studentbus/${id}`);
  }

  updateStudentbus(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/studentbus/${id}`, data);
  }

  deleteStudentbus(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/studentbus/${id}`);
  }

  // =======================
  // FEES METHODS
  // =======================
  getFees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fees`);
  }

  saveFees(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/fees`, data);
  }

  getFeesById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/fees/${id}`);
  }

  updateFees(id: number, fees: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/fees/${id}`, fees);
  }

  deleteFees(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fees/${id}`);
  }

  // =======================
  // LIBRARY METHODS
  // =======================
  getLibrary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/library`);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/library/${id}`);
  }

  saveBook(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/library`, book);
  }

  updateLibrary(id: number, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/library/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/library/${id}`);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/library`);
  }
}
