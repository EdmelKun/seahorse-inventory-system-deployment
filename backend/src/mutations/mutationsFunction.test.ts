import db from '../../prisma/client';
import { CustomerMutation } from '../types/customer';
import { SupplierMutation } from '../types/suppliers';
import { ProductMutation } from '../types/product';
import mutate from './mutationsFunction';
import { ClassificationMutation } from '../types/classification';
import { ClassificationOnProductMutation } from '../types/classificationOnProducts';

// Mock the database client
const dbClient = db;
jest.mock('../../prisma/client', () => ({
  customers: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({}),
  },
  suppliers: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({}),
  },
  products: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({}),
  },
  classification: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({}),
    findMany: jest.fn().mockResolvedValue([]),
  },
  classificationOnProducts: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    findUnique: jest.fn().mockResolvedValue({}),
    findMany: jest.fn().mockResolvedValue([]),
  },
}));

// Test data
const staticDate = new Date('2023-05-05');
const testCustomer: CustomerMutation = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  sex: 'MALE',
  contactNum: '123-456-7890',
  emailAddress: 'john@example.com',
  country: 'USA',
  province: 'New York',
  municipality: 'New York City',
  street: '123 Elm St',
  zipCode: 10001,
  active: true,
  action: 'ADD',
  createdAt: staticDate,
  updatedAt: staticDate,
};

const testSupplier: SupplierMutation = {
  id: 1,
  contactName: 'Supplier1',
  businessName: 'Supplier Inc',
  contactNum: '123-456-7890',
  emailAddress: 'supplier@example.com',
  country: 'USA',
  province: 'New York',
  municipality: 'New York City',
  street: '456 Oak St',
  zipCode: 10002,
  active: true,
  action: 'ADD',
  createdAt: staticDate,
  updatedAt: staticDate,
};

const testProduct: ProductMutation = {
  id: 1,
  name: 'Test Product',
  storeStock: 10,
  warehouseStock: 20,
  retailPrice: 25.99,
  wholesalePrice: 19.99,
  wholesaleAmount: 100,
  lowstockAlert: 5,
  description: 'A test product',
  brand: 'Test Brand',
  active: true,
  action: 'ADD',
  createdAt: staticDate,
  updatedAt: staticDate,
};

const testClassification: ClassificationMutation = {
  id: 1,
  name: 'Test Classification',
  active: true,
  action: 'ADD',
  createdAt: staticDate,
  updatedAt: staticDate,
};

const testClassificationOnProduct: ClassificationOnProductMutation = {
  id: 1,
  productId: 2,
  classificationId: 2,
  active: true,
  action: 'ADD',
  createdAt: new Date('2023-05-05'),
  updatedAt: new Date('2023-05-05'),
};

// Test cases
describe('Mutations Function', () => {
  let originalDate: any;
  beforeEach(() => {
    originalDate = Date;
    const mockedDate = new Date('2023-05-05');
    jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
  });

  afterEach(() => {
    global.Date = originalDate;
    jest.clearAllMocks();
  });

  describe('Add, edit, and delete a customer', () => {
    // Add
    it('works with adding', async () => {
      testCustomer.action = 'ADD';
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [testCustomer],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.customers.create).toHaveBeenCalledWith({
        data: {
          firstName: 'John',
          lastName: 'Doe',
          sex: 'MALE',
          contactNum: '123-456-7890',
          emailAddress: 'john@example.com',
          country: 'USA',
          province: 'New York',
          municipality: 'New York City',
          street: '123 Elm St',
          zipCode: 10001,
          active: true,
        },
      });
    });
    // Edit
    it('works with editing', async () => {
      testCustomer.action = 'UPDATE';
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [testCustomer],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.customers.update).toHaveBeenCalledWith({
        where: { id: testCustomer.id },
        data: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          sex: 'MALE',
          contactNum: '123-456-7890',
          emailAddress: 'john@example.com',
          country: 'USA',
          province: 'New York',
          municipality: 'New York City',
          street: '123 Elm St',
          zipCode: 10001,
          active: true,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });

    // Delete
    it('works with deleting', async () => {
      testCustomer.action = 'DELETE';
      await mutate(
        {
          productLogs: [],
          products: [],
          customers: [testCustomer],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.customers.update).toHaveBeenCalledWith({
        where: { id: testCustomer.id },
        data: {
          firstName: expect.stringMatching(/^INACTIVE-.*-\d+$/),
          active: false,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
  });

  describe('Add, edit, and delete a supplier', () => {
    // Add
    it('works with adding', async () => {
      testSupplier.action = 'ADD';
      await mutate(
        {
          productLogs: [],
          products: [],
          customers: [],
          suppliers: [testSupplier],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.suppliers.create).toHaveBeenCalledWith({
        data: {
          contactName: 'Supplier1',
          businessName: 'Supplier Inc',
          contactNum: '123-456-7890',
          emailAddress: 'supplier@example.com',
          country: 'USA',
          province: 'New York',
          municipality: 'New York City',
          street: '456 Oak St',
          zipCode: 10002,
          active: true,
        },
      });
    });
    // Edit
    it('works with editing', async () => {
      testSupplier.action = 'UPDATE';
      await mutate(
        {
          productLogs: [],
          products: [],
          customers: [],
          suppliers: [testSupplier],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.suppliers.update).toHaveBeenCalledWith({
        where: { id: testSupplier.id },
        data: {
          id: 1,
          contactName: 'Supplier1',
          businessName: 'Supplier Inc',
          contactNum: '123-456-7890',
          emailAddress: 'supplier@example.com',
          country: 'USA',
          province: 'New York',
          municipality: 'New York City',
          street: '456 Oak St',
          zipCode: 10002,
          active: true,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
    // Delete
    it('works with deleting', async () => {
      testSupplier.action = 'DELETE';
      await mutate(
        {
          productLogs: [],
          products: [],
          customers: [],
          suppliers: [testSupplier],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.suppliers.update).toHaveBeenCalledWith({
        where: { id: testSupplier.id },
        data: {
          contactName: expect.stringMatching(/^INACTIVE-.*-\d+$/),
          active: false,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
  });

  describe('Add, edit, and delete a product', () => {
    // Add
    it('works with adding', async () => {
      testProduct.action = 'ADD';
      await mutate(
        {
          productLogs: [],
          products: [testProduct],
          customers: [],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.products.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Product',
          storeStock: 10,
          warehouseStock: 20,
          retailPrice: 25.99,
          wholesalePrice: 19.99,
          wholesaleAmount: 100,
          lowstockAlert: 5,
          description: 'A test product',
          brand: 'Test Brand',
          active: true,
        },
      });
    });
    // Edit
    it('works with editing', async () => {
      testProduct.action = 'UPDATE';
      await mutate(
        {
          productLogs: [],
          products: [testProduct],
          customers: [],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );

      expect(dbClient.products.update).toHaveBeenCalledWith({
        where: { id: testProduct.id },
        data: {
          name: 'Test Product',
          storeStock: 10,
          warehouseStock: 20,
          retailPrice: 25.99,
          wholesalePrice: 19.99,
          wholesaleAmount: 100,
          lowstockAlert: 5,
          description: 'A test product',
          brand: 'Test Brand',
          active: true,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });

    // Delete
    it('works with deleting', async () => {
      testProduct.action = 'DELETE';
      await mutate(
        {
          productLogs: [],
          products: [testProduct],
          customers: [],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.products.update).toHaveBeenCalledWith({
        where: { id: testProduct.id },
        data: {
          name: expect.stringMatching(/^INACTIVE-.*-\d+$/),
          active: false,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
  });

  describe('Add, edit, and delete a classification', () => {
    // Add
    it('works with adding', async () => {
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [],
          suppliers: [],
          classifications: [testClassification],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.classification.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Classification',
          active: true,
        },
      });
    });

    // Edit
    it('works with editing', async () => {
      testClassification.action = 'UPDATE';
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [],
          suppliers: [],
          classifications: [testClassification],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.classification.update).toHaveBeenCalledWith({
        where: { id: testClassification.id },
        data: {
          name: 'Test Classification',
          active: true,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });

    // Delete
    it('works with deleting', async () => {
      testClassification.action = 'DELETE';
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [],
          suppliers: [],
          classifications: [testClassification],
          classificationOnProducts: [],
        },
        dbClient,
      );
      expect(dbClient.classification.update).toHaveBeenCalledWith({
        where: { id: testClassification.id },
        data: {
          name: expect.stringMatching(/^INACTIVE-.*-\d+$/),
          active: false,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
  });

  describe('Add, edit, and delete a classification on product', () => {
    // Add
    it('works with adding', async () => {
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [testClassificationOnProduct],
        },
        dbClient,
      );
      expect(dbClient.classificationOnProducts.create).toHaveBeenCalledWith({
        data: {
          productId: 2,
          classificationId: 2,
          active: true,
        },
      });
    });
    // Edit
    it('works with editing', async () => {
      testClassificationOnProduct.action = 'UPDATE';
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [testClassificationOnProduct],
        },
        dbClient,
      );
      expect(dbClient.classificationOnProducts.update).toHaveBeenCalledWith({
        where: { id: testClassificationOnProduct.id },
        data: {
          productId: 2,
          classificationId: 2,
          active: true,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
    // Delete
    it('works with deleting', async () => {
      testClassificationOnProduct.action = 'DELETE';
      await mutate(
        {
          products: [],
          productLogs: [],
          customers: [],
          suppliers: [],
          classifications: [],
          classificationOnProducts: [testClassificationOnProduct],
        },
        dbClient,
      );

      expect(dbClient.classificationOnProducts.update).toHaveBeenCalledWith({
        where: { id: testClassificationOnProduct.id },
        data: {
          active: false,
          updatedAt: new Date('2023-05-05'),
        },
      });
    });
  });
});
