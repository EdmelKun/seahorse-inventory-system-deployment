export interface ProductMutation {
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
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
