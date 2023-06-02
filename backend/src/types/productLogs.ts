import { ProductLogs } from '@prisma/client';

export interface CreateProductLogs {
  productId: number;

  previousStoreStock: number;
  previousWarehouseStock: number;
  previousRetailPrice: number;
  previousWholesalePrice: number;

  updatedStoreStock: number;
  updatedWarehouseStock: number;
  updatedRetailPrice: number;
  updatedWholesalePrice: number;
  date: Date;
}

export interface UpdateProductLogs
  extends Omit<ProductLogs, 'createdAt' | 'updatedAt'> {}

export interface ProductLogsMutation {
  id: number;
  productId: number;

  previousStoreStock: number;
  previousWarehouseStock: number;
  previousRetailPrice: number;
  previousWholesalePrice: number;

  updatedStoreStock: number;
  updatedWarehouseStock: number;
  updatedRetailPrice: number;
  updatedWholesalePrice: number;
  date: Date;
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
