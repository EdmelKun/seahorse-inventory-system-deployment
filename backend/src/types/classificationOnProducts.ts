export interface CreateClassificationOnProduct {
  productId: number;
  classificationId: number;
}

export interface ClassificationOnProductMutation {
  id: number;
  productId: number;
  classificationId: number;
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateClassificationOnProduct {
  id: number;
  productId: number;
  classificationId: number;
}
