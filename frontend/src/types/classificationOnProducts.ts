export type ClassificationOnProductsFromBackend = {
  id: number;
  productId: number;
  classificationId: number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ClassificationOnProductsDocType = {
  id: string;
  productId: number;
  classificationId: number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
