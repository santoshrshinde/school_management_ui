// src/app/admission/admission.model.ts
export class AddAdmission {
  StudentID!: number;
  CourseID!: number;
  AdmissionDate!: Date;
}

export class ListAdmission {
  AdmissionID!: number;
  StudentID!: number;
  CourseID!: number;
  AdmissionDate!: Date;
}
