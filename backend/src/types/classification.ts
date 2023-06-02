import { Classification } from '@prisma/client';

export interface CreateClassification
  extends Omit<Classification, 'createdAt' | 'updatedAt'> {}

export interface ClassificationMutation {
  id: number;
  name: string;
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateClassification {
  id: number;
  name: string;
}
