import { ClassificationCollection } from '../rxdb/schema/classification/classification';
import { ClassificationQueueCollection } from '../rxdb/schema/classification/classificationQueue';
import { ClassificationOnProductsCollection } from '../rxdb/schema/classificationOnProducts/classificationOnProducts';
import { ClassificationOnProductsQueueCollection } from '../rxdb/schema/classificationOnProducts/classificationOnProductsQueue';
import { CustomerCollection } from '../rxdb/schema/customer/customer';
import { CustomerQueueCollection } from '../rxdb/schema/customer/customerQueue';
import { ProductQueueCollection } from '../rxdb/schema/product/productQueue';
import { ProductCollection } from '../rxdb/schema/product/products';
import { ProductLogsCollection } from '../rxdb/schema/productLogs/productLogs';
import { ProductLogsQueueCollection } from '../rxdb/schema/productLogs/productLogsQueue';
import { SupplierCollection } from '../rxdb/schema/supplier/supplier';
import { SupplierQueueCollection } from '../rxdb/schema/supplier/supplierQueue';
import { ClassificationDocType } from './classification';
import { ClassificationOnProductsDocType } from './classificationOnProducts';
import { CustomerDocType } from './customer';
import { ProductDocType } from './product';
import { ProductLogsDocType } from './productLogs';
import { SupplierDocType } from './supplier';

export type RxdbCollections =
  | ProductDocType
  | CustomerDocType
  | SupplierDocType
  | ProductLogsDocType
  | ClassificationDocType
  | ClassificationOnProductsDocType;

export type Collections =
  | ProductCollection
  | CustomerCollection
  | SupplierCollection
  | ProductLogsCollection
  | ClassificationCollection
  | ClassificationOnProductsCollection;

export type QueueCollections =
  | ProductQueueCollection
  | CustomerQueueCollection
  | SupplierQueueCollection
  | ProductLogsQueueCollection
  | ClassificationQueueCollection
  | ClassificationOnProductsQueueCollection;

export type DataFromRxdb = {
  products: ProductDocType[];
  customers: CustomerDocType[];
  suppliers: SupplierDocType[];
  productLogs: ProductLogsDocType[];
  classifications: ClassificationDocType[];
  classificationOnProducts: ClassificationOnProductsDocType[];
};

export type CollectionTables =
  | 'PRODUCT'
  | 'PRODUCT_QUEUE'
  | 'CUSTOMER'
  | 'CUSTOMER_QUEUE'
  | 'SUPPLIER'
  | 'SUPPLIER_QUEUE'
  | 'PRODUCT_LOGS'
  | 'PRODUCT_LOGS_QUEUE'
  | 'CLASSIFICATION'
  | 'CLASSIFICATION_QUEUE'
  | 'CLASSIFICATION_ON_PRODUCTS'
  | 'CLASSIFICATION_ON_PRODUCTS_QUEUE';

export type NewProductDocType = Omit<
  ProductDocType,
  'id' | 'active' | 'createdAt' | 'updatedAt'
>;

export type NewCustomerDocType = Omit<
  CustomerDocType,
  'id' | 'active' | 'createdAt' | 'updatedAt'
>;

export type NewSupplierDocType = Omit<
  SupplierDocType,
  'id' | 'active' | 'createdAt' | 'updatedAt'
>;

export type NewProductLogsDocType = Omit<
  ProductLogsDocType,
  'id' | 'active' | 'createdAt' | 'updatedAt'
>;

export type NewClassificationDocType = Omit<
  ClassificationDocType,
  'id' | 'active' | 'createdAt' | 'updatedAt'
>;

export type NewClassificationOnProductsDocType = Omit<
  ClassificationOnProductsDocType,
  'id' | 'active' | 'createdAt' | 'updatedAt'
>;

export type NewDataInput =
  | NewProductDocType
  | NewCustomerDocType
  | NewSupplierDocType
  // | NewProductLogsDocType
  | NewClassificationDocType
  | NewClassificationOnProductsDocType;

export type Mutations =
  | {
      table: 'PRODUCT';
      type: 'ADD';
      dataInput: NewProductDocType;
    }
  | {
      table: 'PRODUCT';
      type: 'UPDATE' | 'DELETE';
      dataInput: ProductDocType;
    }
  | {
      table: 'CUSTOMER';
      type: 'ADD';
      dataInput: NewCustomerDocType;
    }
  | {
      table: 'CUSTOMER';
      type: 'UPDATE' | 'DELETE';
      dataInput: CustomerDocType;
    }
  | {
      table: 'SUPPLIER';
      type: 'ADD';
      dataInput: NewSupplierDocType;
    }
  | {
      table: 'SUPPLIER';
      type: 'UPDATE' | 'DELETE';
      dataInput: SupplierDocType;
    }
  | {
      table: 'CLASSIFICATION';
      type: 'ADD';
      dataInput: NewClassificationDocType;
    }
  | {
      table: 'CLASSIFICATION';
      type: 'UPDATE' | 'DELETE';
      dataInput: ClassificationDocType;
    }
  | {
      table: 'CLASSIFICATION_ON_PRODUCTS';
      type: 'ADD';
      dataInput: NewClassificationOnProductsDocType;
    }
  | {
      table: 'CLASSIFICATION_ON_PRODUCTS';
      type: 'UPDATE' | 'DELETE';
      dataInput: ClassificationOnProductsDocType;
    };
