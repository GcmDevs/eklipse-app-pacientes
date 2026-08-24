import type { SpecialtyId } from './specialty';

export type Patient = {
  id: string;
  patientCode: string;
  roleLabel: string;
  specialtyId: SpecialtyId;
  specialtyLabel: string;
  institution: string;
  branch: string;
  documentType: string;
  documentNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  fullName: string;
  shortName: string;
  initials: string;
  birthDate: string;
  sex: string;
  bloodType: string;
  email: string;
  mobilePhone: string;
  alternatePhone: string;
  address: string;
  municipality: string;
  department: string;
};
