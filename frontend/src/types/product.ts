export interface ProductFromBackend {
  id: number;
  name: string;
  storeStock: number;
  warehouseStock: number;
  retailPrice: number;
  wholesalePrice: number;
  wholesaleAmount: number;
  lowstockAlert: number;
  description: string;
  brand: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDocType {
  id: string;
  name: string;
  storeStock: number;
  warehouseStock: number;
  retailPrice: number;
  wholesalePrice: number;
  wholesaleAmount: number;
  lowstockAlert: number;
  description: string;
  brand: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// export interface ProductQueueRxdb {
//   id: string;
//   name: string;
//   store_stock: number;
//   warehouse_stock: number;
//   retail_price: number;
//   wholesale_price: number;
//   wholesale_amount: number;
//   lowstock_alert: number;
//   description: string;
//   brand: string;
//   action: 'ADD' | 'DELETE' | 'UPDATE';

//   active: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }
