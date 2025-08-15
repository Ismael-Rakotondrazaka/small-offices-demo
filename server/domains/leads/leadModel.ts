import type { Lead } from '~~/generated/prisma/client';
import type { OfficeModel } from '~~/server/domains/offices/officeModel';

export interface LeadModel extends Lead {
  office: OfficeModel;
}
