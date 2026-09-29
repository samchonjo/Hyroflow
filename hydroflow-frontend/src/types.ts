export type UserRole = 'student' | 'technician' | 'admin';
export type TicketStatus = 'open' | 'in_progress' | 'closed';
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  regNumber?: string;
  name: string;
  email: string;
  role: UserRole;
  hostelBlock?: string;
  roomNumber?: string;
  phone?: string;
  meterNumber?: string;
  password?: string;
}

export interface Ticket {
  id: string;
  studentId: string;
  studentName: string;
  regNumber: string;
  hostelBlock: string;
  roomNumber: string;
  issueType: string;
  description: string;
  status: TicketStatus;
  priority: PriorityLevel;
  technicianId?: string;
  technicianName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WaterConsumption {
  id: string;
  hostelBlock: string;
  litersConsumed: number;
  readingDate: string;
}
