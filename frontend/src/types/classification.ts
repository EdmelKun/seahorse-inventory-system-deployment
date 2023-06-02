export type ClassificationDocType = {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ClassificationFromBackend = Omit<ClassificationDocType, 'id'> & {
  id: number;
};
