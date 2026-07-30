import type { Patient } from '@/types/patient'

export const mockPatients: Patient[] = [
  {
    id: 'patient-maria-001',
    patientCode: 'PAC-000123',
    roleLabel: 'Paciente',
    institution: 'Clinica Medicos',
    branch: 'Alta Complejidad Aguachica',
    documentType: 'Cedula de ciudadania',
    documentNumber: '123456789',
    firstName: 'Maria',
    middleName: 'Fernanda',
    lastName: 'Rodriguez',
    secondLastName: 'Perez',
    fullName: 'Maria Fernanda Rodriguez Perez',
    shortName: 'Maria',
    initials: 'MR',
    birthDate: '14 de marzo de 1980',
    sex: 'Femenino',
    email: 'maria.rodriguez@example.com',
    mobilePhone: '300 000 0000',
    alternatePhone: '605 000 0000',
    address: 'Calle 10 # 15-20',
    municipality: 'Aguachica',
    department: 'Cesar',
  },
  {
    id: 'patient-carlos-001',
    patientCode: 'PAC-000124',
    roleLabel: 'Paciente',
    institution: 'Clinica Medicos',
    branch: 'Alta Complejidad Aguachica',
    documentType: 'Cedula de ciudadania',
    documentNumber: '987654321',
    firstName: 'Carlos',
    middleName: 'Andres',
    lastName: 'Martinez',
    secondLastName: 'Lopez',
    fullName: 'Carlos Andres Martinez Lopez',
    shortName: 'Carlos',
    initials: 'CM',
    birthDate: '22 de septiembre de 1978',
    sex: 'Masculino',
    email: 'carlos.martinez@example.com',
    mobilePhone: '301 111 2233',
    alternatePhone: '605 111 2233',
    address: 'Carrera 8 # 12-44',
    municipality: 'Aguachica',
    department: 'Cesar',
  },
]

export const defaultMockPatient = mockPatients[0]

export function findMockPatientById(patientId: string) {
  return mockPatients.find((patient) => patient.id === patientId) ?? null
}

export function findMockPatientByDocument(documentNumber: string) {
  return (
    mockPatients.find((patient) => patient.documentNumber === documentNumber) ??
    null
  )
}
