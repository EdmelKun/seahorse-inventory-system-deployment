export interface ProductLogsFromBackend {
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

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductLogsDocType {
  id: string;
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

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailedProductLogs {
  id: string;
  productId: number;
  name: string;

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
