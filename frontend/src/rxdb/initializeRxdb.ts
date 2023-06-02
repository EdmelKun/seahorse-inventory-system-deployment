import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
// import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { createRxDatabase } from 'rxdb';
import {
  ProductQueueCollection,
  productQueueSchema,
} from './schema/product/productQueue';
import { ProductCollection, productSchema } from './schema/product/products';
import { CustomerCollection, customerSchema } from './schema/customer/customer';
import {
  CustomerQueueCollection,
  customerQueueSchema,
} from './schema/customer/customerQueue';
import { SupplierCollection, supplierSchema } from './schema/supplier/supplier';
import {
  SupplierQueueCollection,
  supplierQueueSchema,
} from './schema/supplier/supplierQueue';
import {
  ProductLogsCollection,
  productLogsSchema,
} from './schema/productLogs/productLogs';
import {
  ProductLogsQueueCollection,
  productLogsQueueSchema,
} from './schema/productLogs/productLogsQueue';
import {
  ClassificationCollection,
  classificationSchema,
} from './schema/classification/classification';
import {
  ClassificationQueueCollection,
  classificationQueueSchema,
} from './schema/classification/classificationQueue';
import {
  ClassificationOnProductsCollection,
  classificationOnProductsSchema,
} from './schema/classificationOnProducts/classificationOnProducts';
import {
  ClassificationOnProductsQueueCollection,
  classificationOnProductsQueueSchema,
} from './schema/classificationOnProducts/classificationOnProductsQueue';

export type Collections = {
  products: ProductCollection;
  productsQueue: ProductQueueCollection;
  customers: CustomerCollection;
  customersQueue: CustomerQueueCollection;
  suppliers: SupplierCollection;
  suppliersQueue: SupplierQueueCollection;
  productLogs: ProductLogsCollection;
  productLogsQueue: ProductLogsQueueCollection;
  classifications: ClassificationCollection;
  classificationsQueue: ClassificationQueueCollection;
  classificationOnProducts: ClassificationOnProductsCollection;
  classificationOnProductsQueue: ClassificationOnProductsQueueCollection;
};

export default createRxDatabase<Collections>({
  name: 'SeaHorse DB',
  // storage: getRxStorageDexie(),
  storage: getRxStorageMemory(),
}).then(async (database) => {
  await database.addCollections({
    products: {
      schema: productSchema,
    },
    productsQueue: {
      schema: productQueueSchema,
    },
    customers: {
      schema: customerSchema,
    },
    customersQueue: {
      schema: customerQueueSchema,
    },
    suppliers: {
      schema: supplierSchema,
    },
    suppliersQueue: {
      schema: supplierQueueSchema,
    },
    productLogs: {
      schema: productLogsSchema,
    },
    productLogsQueue: {
      schema: productLogsQueueSchema,
    },
    classifications: {
      schema: classificationSchema,
    },
    classificationsQueue: {
      schema: classificationQueueSchema,
    },
    classificationOnProducts: {
      schema: classificationOnProductsSchema,
    },
    classificationOnProductsQueue: {
      schema: classificationOnProductsQueueSchema,
    },
  });

  return database;
});
