import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ======================
   Interfaces
====================== */

export interface Summary {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalAdmissions: number;
}

export interface LibraryAnalysis {
  totalBooks: number;
  issuedBooks: number;
  availableBooks: number;
}

export interface FeesAnalysis {
  paidFees: number;
  pendingFees: number;
}

export interface ExamAnalysis {
  passed: number;
  failed: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:5000/dashboard';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<Summary> {
    return this.http.get<Summary>(`${this.baseUrl}/summary`);
  }

  getLibraryAnalysis(): Observable<LibraryAnalysis> {
    return this.http.get<LibraryAnalysis>(`${this.baseUrl}/library-analysis`);
  }

  getFeesAnalysis(): Observable<FeesAnalysis> {
    return this.http.get<FeesAnalysis>(`${this.baseUrl}/fees-analysis`);
  }

  getExamAnalysis(): Observable<ExamAnalysis> {
    return this.http.get<ExamAnalysis>(`${this.baseUrl}/exam-analysis`);
  }
  getStudentCourseWise(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/student-course-wise`);
}
getBooksAnalysis(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/books-analysis`);
}
getTransportAnalysis() {
  return this.http.get<any>('http://localhost:5000/dashboard/transport-analysis');
}
}
