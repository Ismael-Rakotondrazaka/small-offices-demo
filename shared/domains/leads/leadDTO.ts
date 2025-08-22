import type { OfficeDTO } from '../offices/officeDTO';
import type { LeadStatus } from './leadStatus';

export interface LeadDTO {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  office: OfficeDTO;
  phone: string;
  status: LeadStatus;
  updatedAt: Date;
}
