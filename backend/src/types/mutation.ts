import { CustomerMutation } from './customer';
import { ProductMutation } from './product';
import { SupplierMutation } from './suppliers';
import { ProductLogsMutation } from './productLogs';
import { ClassificationMutation } from './classification';
import { ClassificationOnProductMutation } from './classificationOnProducts';

export type Mutations = {
  products: ProductMutation[];
  productLogs: ProductLogsMutation[];
  customers: CustomerMutation[];
  suppliers: SupplierMutation[];
  classifications: ClassificationMutation[];
  classificationOnProducts: ClassificationOnProductMutation[];
};
