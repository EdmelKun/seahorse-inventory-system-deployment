import { Sex } from '@prisma/client';
import queryAll, { queryAllTables } from './queryAll';
import { queryAllCustomers } from './customers/customerQuery';
import { queryAllProducts } from './products/productQuery';
import { queryAllSuppliers } from './suppliers/supplierQuery';
import { queryAllProductLogs } from './productLogs/productLogsQuery';
import { queryAllClassifications } from './classification/classificationQuery';
import { queryAllClassificationOnProducts } from './classificationOnProducts/classificationOnProductsQuery';

jest.mock('./customers/customerQuery');
jest.mock('./products/productQuery');
jest.mock('./suppliers/supplierQuery');
jest.mock('./productLogs/productLogsQuery');
jest.mock('./classification/classificationQuery');
jest.mock('./classificationOnProducts/classificationOnProductsQuery');

describe('queryAll', () => {
  it('should return all customers', async () => {
    const mockCustomers = [
      {
        id: 1,
        firstName: 'johnny',
        lastName: 'Bravo',
        sex: Sex.MALE,
        contactNum: '+6312345789',
        emailAddress: 'johnny@gmail.com',
        country: 'PHLI',
        province: 'Iloilo',
        municipality: 'Pavia',
        street: 'Sesami',
        zipCode: 1001,

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 2,
        firstName: 'Gei',
        lastName: 'Bruh',
        sex: Sex.MALE,
        contactNum: '+6312827292',
        emailAddress: 'gb@gmail.com',
        country: 'MEX',
        province: 'LaMuerta',
        municipality: 'LosPacodos',
        street: 'Siesta',
        zipCode: 1293,

        active: true,
        createdAt: new Date('11-10-2023'),
        updatedAt: new Date('11-10-2023'),
      },
    ];
    (queryAllCustomers as jest.Mock).mockResolvedValueOnce(mockCustomers);
    await expect(queryAll('CUSTOMERS')).resolves.toEqual(mockCustomers);
  });

  it('should return all products', async () => {
    const mockProducts = [
      {
        id: 4,
        name: 'Product A',
        warehouseStock: 12,
        storeStock: 8,
        retailPrice: 10000,
        wholesaleAmount: 12,
        wholesalePrice: 12333,
        lowstockAlert: 1,
        brand: 'Brnd',
        description: 'Trusted by Many',

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 2,
        name: 'Product BB',
        warehouseStock: 1,
        storeStock: 82,
        retailPrice: 1200,
        wholesaleAmount: 1123,
        wholesalePrice: 12863,
        lowstockAlert: 82,
        brand: 'Iz Nize',
        description: 'Trusted by Many, not really',

        active: true,
        createdAt: new Date('11-10-2013'),
        updatedAt: new Date('11-10-2012'),
      },
    ];
    (queryAllProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    await expect(queryAll('PRODUCTS')).resolves.toEqual(mockProducts);
  });

  it('should return all suppliers', async () => {
    const mockSuppliers = [
      {
        id: 4,
        contactName: 'Kevin',
        businessName: 'AYA Inc.',
        contactNum: '+63123456789',
        emailAddress: 'aya.inc@gmail.com',
        country: 'Phil',
        province: 'Roxas',
        municipality: 'Roxas city',
        street: 'High way drive',
        zipCode: 6021,

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 12,
        contactName: 'Bruhruhru',
        businessName: 'Galon Inc.',
        contactNum: '+63123426789',
        emailAddress: 'galon.inc@gmail.com',
        country: 'Phil',
        province: 'Manila',
        municipality: 'Not Real City',
        street: 'Very Real',
        zipCode: 7821,

        active: true,
        createdAt: new Date('11-10-2012'),
        updatedAt: new Date('11-10-2015'),
      },
    ];
    (queryAllSuppliers as jest.Mock).mockResolvedValueOnce(mockSuppliers);
    await expect(queryAll('SUPPLIERS')).resolves.toEqual(mockSuppliers);
  });

  it('should return all ProductLogs', async () => {
    const mockProductLogs = [
      {
        id: 1,
        productId: 2,
        previousStoreStock: 20,
        previousWarehouseStock: 30,
        previousRetailPrice: 20,
        previousWholesalePrice: 20,

        updatedStoreStock: 20,
        updatedWarehouseStock: 20,
        updatedRetailPrice: 20,
        updatedWholesalePrice: 20,
        date: new Date('11-10-2022'),

        active: true,
        createdAt: new Date('11-10-2012'),
        updatedAt: new Date('11-10-2015'),
      },
    ];
    (queryAllProductLogs as jest.Mock).mockResolvedValueOnce(mockProductLogs);
    await expect(queryAll('PRODUCTLOGS')).resolves.toEqual(mockProductLogs);
  });

  it('should return all classifications', async () => {
    const mockClassifications = [
      {
        id: 1,
        name: 'Fishing',
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 2,
        name: 'Bait',
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
    ];
    (queryAllClassifications as jest.Mock).mockResolvedValueOnce(
      mockClassifications,
    );
    await expect(queryAll('CLASSIFICATIONS')).resolves.toEqual(
      mockClassifications,
    );
  });

  it('should return all classifications on products', async () => {
    const mockClassificationsOnProducts = [
      {
        id: 1,
        productId: 4,
        classificationId: 1,
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 2,
        productId: 2,
        classificationId: 2,
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
    ];
    (queryAllClassificationOnProducts as jest.Mock).mockResolvedValueOnce(
      mockClassificationsOnProducts,
    );
    await expect(queryAll('CLASSIFICATION_ON_PRODUCTS')).resolves.toEqual(
      mockClassificationsOnProducts,
    );
  });

  it('should handle errors from queryAllCustomers', async () => {
    (queryAllCustomers as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAll('CUSTOMERS')).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllProducts', async () => {
    (queryAllProducts as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAll('PRODUCTS')).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllSuppliers', async () => {
    (queryAllSuppliers as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAll('SUPPLIERS')).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllProductLogs', async () => {
    (queryAllProductLogs as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAll('PRODUCTLOGS')).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllClassifications', async () => {
    (queryAllClassifications as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAll('CLASSIFICATIONS')).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllClassificationOnProducts', async () => {
    (queryAllClassificationOnProducts as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAll('CLASSIFICATION_ON_PRODUCTS')).rejects.toThrow(
      'DATABASE ERROR',
    );
  });
});

describe('queryAllTables', () => {
  it('should return all tables with their data', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Nike Air Max 90',
        storeStock: 50,
        warehouseStock: 100,
        retailPrice: 150.0,
        wholesalePrice: 100.0,
        wholesaleAmount: 10.0,
        lowstockAlert: 20,
        description: 'A classic Nike sneaker with a timeless design.',
        brand: 'Nike',
        ClassificationOnProducts: [
          {
            id: 1,
            classification: 'Running',
          },
        ],
        active: true,
        createdAt: '2023-03-28T10:30:00.000Z',
        updatedAt: '2023-03-28T10:30:00.000Z',
      },
      {
        id: 2,
        name: 'Product BB',
        warehouseStock: 1,
        storeStock: 82,
        retailPrice: 1200,
        wholesaleAmount: 1123,
        wholesalePrice: 12863,
        lowstockAlert: 82,
        brand: 'Iz Nize',
        description: 'Trusted by Many, not really',

        active: true,
        createdAt: new Date('11-10-2013'),
        updatedAt: new Date('11-10-2012'),
      },
    ];
    const mockCustomers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        sex: 'Male',
        contactNum: '123-456-7890',
        emailAddress: 'johndoe@example.com',
        country: 'United States',
        province: 'California',
        municipality: 'Los Angeles',
        street: '123 Main Street',
        zipCode: 90001,
        active: true,
        createdAt: '2023-03-28T10:30:00.000Z',
        updatedAt: '2023-03-28T10:30:00.000Z',
      },
      {
        id: 1,
        firstName: 'johnny',
        lastName: 'Bravo',
        sex: Sex.MALE,
        contactNum: '+6312345789',
        emailAddress: 'johnny@gmail.com',
        country: 'PHLI',
        province: 'Iloilo',
        municipality: 'Pavia',
        street: 'Sesami',
        zipCode: 1001,

        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
    ];
    const mockSuppliers = [
      {
        id: 1,
        contact_name: 'Jane Doe',
        business_name: 'ABC Company',
        contact_num: '555-123-4567',
        email_address: 'janedoe@abccompany.com',
        country: 'Canada',
        province: 'Ontario',
        municipality: 'Toronto',
        street: '456 Main Street',
        zipCode: 'M5V 2B7',
        active: true,
        createdAt: '2023-03-28T10:30:00.000Z',
        updatedAt: '2023-03-28T10:30:00.000Z',
      },
      {
        id: 12,
        contactName: 'Bruhruhru',
        businessName: 'Galon Inc.',
        contactNum: '+63123426789',
        emailAddress: 'galon.inc@gmail.com',
        country: 'Phil',
        province: 'Manila',
        municipality: 'Not Real City',
        street: 'Very Real',
        zipCode: 7821,

        active: true,
        createdAt: new Date('11-10-2012'),
        updatedAt: new Date('11-10-2015'),
      },
    ];

    const mockProductLogs = [
      {
        id: 1,
        productId: 2,
        previousStoreStock: 20,
        previousWarehouseStock: 30,
        previousRetailPrice: 20,
        previousWholesalePrice: 20,

        updatedStoreStock: 20,
        updatedWarehouseStock: 20,
        updatedRetailPrice: 20,
        updatedWholesalePrice: 20,
        date: new Date('11-10-2022'),

        active: true,
        createdAt: new Date('11-10-2012'),
        updatedAt: new Date('11-10-2015'),
      },
    ];

    const mockClassifications = [
      {
        id: 1,
        name: 'Fishing',
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 2,
        name: 'Bait',
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
    ];

    const mockClassificationsOnProducts = [
      {
        id: 1,
        productId: 4,
        classificationId: 1,
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
      {
        id: 2,
        productId: 2,
        classificationId: 2,
        active: true,
        createdAt: new Date('11-10-2022'),
        updatedAt: new Date('11-10-2022'),
      },
    ];

    (queryAllProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
    (queryAllCustomers as jest.Mock).mockResolvedValueOnce(mockCustomers);
    (queryAllSuppliers as jest.Mock).mockResolvedValueOnce(mockSuppliers);
    (queryAllProductLogs as jest.Mock).mockResolvedValueOnce(mockProductLogs);
    (queryAllClassifications as jest.Mock).mockResolvedValueOnce(
      mockClassifications,
    );
    (queryAllClassificationOnProducts as jest.Mock).mockResolvedValueOnce(
      mockClassificationsOnProducts,
    );

    await expect(queryAllTables()).resolves.toEqual({
      products: mockProducts,
      customers: mockCustomers,
      suppliers: mockSuppliers,
      productLogs: mockProductLogs,
      classifications: mockClassifications,
      classificationOnProducts: mockClassificationsOnProducts,
    });
  });

  it('should handle errors from queryAllCustomers', async () => {
    (queryAllCustomers as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAllTables()).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllSuppliers', async () => {
    (queryAllSuppliers as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAllTables()).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllProducts', async () => {
    (queryAllProducts as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAllTables()).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllProductLogs', async () => {
    (queryAllProductLogs as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAllTables()).rejects.toThrow('DATABASE ERROR');
  });
  it('should handle errors from queryAllClassifications', async () => {
    (queryAllClassifications as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAllTables()).rejects.toThrow('DATABASE ERROR');
  });

  it('should handle errors from queryAllClassificationOnProducts', async () => {
    (queryAllClassificationOnProducts as jest.Mock).mockRejectedValueOnce(
      new Error('DATABASE ERROR'),
    );
    await expect(queryAllTables()).rejects.toThrow('DATABASE ERROR');
  });
});
