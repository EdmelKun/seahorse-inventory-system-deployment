import { ClassificationFromBackend } from './classification';
import { ClassificationOnProductsFromBackend } from './classificationOnProducts';
import { CustomerFromBackend } from './customer';
import { ProductFromBackend } from './product';
import { ProductLogsFromBackend } from './productLogs';
import { SupplierFromBackend } from './supplier';

export type BackendCollections =
  | ProductFromBackend
  | CustomerFromBackend
  | SupplierFromBackend
  | ProductLogsFromBackend
  | ClassificationFromBackend
  | ClassificationOnProductsFromBackend;

export type DataFromBackend = {
  products: ProductFromBackend[];
  customers: CustomerFromBackend[];
  suppliers: SupplierFromBackend[];
  productLogs: ProductLogsFromBackend[];
  classifications: ClassificationFromBackend[];
  classificationOnProducts: ClassificationOnProductsFromBackend[];
};
