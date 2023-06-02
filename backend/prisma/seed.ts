/* eslint-disable no-console */
import db from './client';

Promise.all([
  db.user
    .createMany({
      data: [
        {
          username: 'joeviemar',
          password:
            '$2b$10$HLFWyzozG//fpLEq2cI6ueVT1uwz.rw4P/ZBVJabwJuc6IXrcaPqS',
          admin: true,
        },
        {
          username: 'nonAdminJoeviemar',
          password:
            '$2b$10$HLFWyzozG//fpLEq2cI6ueVT1uwz.rw4P/ZBVJabwJuc6IXrcaPqS',
          admin: false,
        },
      ],
    })
    .then(() => {
      db.user.findMany().then((result: any) => {
        console.log(result);
      });
    }),

  db.products
    .createMany({
      data: [
        {
          name: 'Eau de Parfum',
          storeStock: 20,
          warehouseStock: 50,
          retailPrice: 155.0,
          wholesalePrice: 1020.0,
          wholesaleAmount: 5,
          lowstockAlert: 10,
          description: 'very fragrant',
          brand: 'Avon',
        },
        {
          name: 'Crocky',
          storeStock: 30,
          warehouseStock: 60,
          retailPrice: 200.0,
          wholesalePrice: 5000.0,
          wholesaleAmount: 5,
          lowstockAlert: 10,
          description: 'very sturdy',
          brand: 'Lacoste',
        },
        {
          name: 'Fishda',
          storeStock: 40,
          warehouseStock: 60,
          retailPrice: 250.0,
          wholesalePrice: 2000.0,
          wholesaleAmount: 5,
          lowstockAlert: 10,
          description: 'very durable',
          brand: 'Nemo',
        },
        {
          name: 'Nails',
          storeStock: 50,
          warehouseStock: 70,
          retailPrice: 50.0,
          wholesalePrice: 500.0,
          wholesaleAmount: 5,
          lowstockAlert: 10,
          description: 'very sharp',
          brand: 'Nickelback',
        },
        {
          name: 'Hollow Blocks',
          storeStock: 70,
          warehouseStock: 80,
          retailPrice: 15.0,
          wholesalePrice: 100.0,
          wholesaleAmount: 10,
          lowstockAlert: 10,
          description: 'very strong',
          brand: 'Cementine',
        },
        {
          name: 'Black twine',
          storeStock: 70,
          warehouseStock: 80,
          retailPrice: 15.0,
          wholesalePrice: 100.0,
          wholesaleAmount: 10,
          lowstockAlert: 10,
          description: '210/21 very strong',
          brand: 'Phil fishing gear',
        },
      ],
    })
    .then(() => {
      db.products.findMany().then((result: any) => {
        // eslint-disable-next-line no-console
        console.log(result);
      });
    })
    .then(() => {
      db.productLogs
        .createMany({
          data: [
            {
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
            },
            {
              productId: 2,
              previousStoreStock: 200,
              previousWarehouseStock: 300,
              previousRetailPrice: 200,
              previousWholesalePrice: 200,

              updatedStoreStock: 200,
              updatedWarehouseStock: 200,
              updatedRetailPrice: 200,
              updatedWholesalePrice: 200,
              date: new Date('12-12-2022'),
            },
            {
              productId: 1,
              previousStoreStock: 10,
              previousWarehouseStock: 30,
              previousRetailPrice: 150,
              previousWholesalePrice: 1000,
              updatedStoreStock: 20,
              updatedWarehouseStock: 50,
              updatedRetailPrice: 155,
              updatedWholesalePrice: 1020,
              date: new Date('11-10-2022'),
            },
            {
              productId: 2,
              previousStoreStock: 20,
              previousWarehouseStock: 50,
              previousRetailPrice: 190,
              previousWholesalePrice: 4000,
              updatedStoreStock: 30,
              updatedWarehouseStock: 60,
              updatedRetailPrice: 200,
              updatedWholesalePrice: 5000,
              date: new Date('12-12-2022'),
            },
            {
              productId: 3,
              previousStoreStock: 30,
              previousWarehouseStock: 50,
              previousRetailPrice: 240,
              previousWholesalePrice: 1500,
              updatedStoreStock: 40,
              updatedWarehouseStock: 60,
              updatedRetailPrice: 250,
              updatedWholesalePrice: 2000,
              date: new Date('10-12-2022'),
            },
            {
              productId: 4,
              previousStoreStock: 40,
              previousWarehouseStock: 60,
              previousRetailPrice: 45,
              previousWholesalePrice: 400,
              updatedStoreStock: 50,
              updatedWarehouseStock: 70,
              updatedRetailPrice: 50,
              updatedWholesalePrice: 500,
              date: new Date('11-11-2022'),
            },
            {
              productId: 5,
              previousStoreStock: 60,
              previousWarehouseStock: 70,
              previousRetailPrice: 14,
              previousWholesalePrice: 90,
              updatedStoreStock: 70,
              updatedWarehouseStock: 80,
              updatedRetailPrice: 15,
              updatedWholesalePrice: 100,
              date: new Date('10-10-2022'),
            },
            {
              productId: 6,
              previousStoreStock: 60,
              previousWarehouseStock: 70,
              previousRetailPrice: 14,
              previousWholesalePrice: 90,
              updatedStoreStock: 70,
              updatedWarehouseStock: 80,
              updatedRetailPrice: 15,
              updatedWholesalePrice: 100,
              date: new Date('11-09-2022'),
            },
            {
              productId: 1,
              previousStoreStock: 20,
              previousWarehouseStock: 50,
              previousRetailPrice: 155,
              previousWholesalePrice: 1020,
              updatedStoreStock: 30,
              updatedWarehouseStock: 60,
              updatedRetailPrice: 160,
              updatedWholesalePrice: 1050,
              date: new Date('01-01-2023'),
            },
            {
              productId: 2,
              previousStoreStock: 30,
              previousWarehouseStock: 60,
              previousRetailPrice: 200,
              previousWholesalePrice: 5000,
              updatedStoreStock: 40,
              updatedWarehouseStock: 70,
              updatedRetailPrice: 210,
              updatedWholesalePrice: 5100,
              date: new Date('02-02-2023'),
            },
            {
              productId: 3,
              previousStoreStock: 40,
              previousWarehouseStock: 60,
              previousRetailPrice: 250,
              previousWholesalePrice: 2000,
              updatedStoreStock: 50,
              updatedWarehouseStock: 70,
              updatedRetailPrice: 260,
              updatedWholesalePrice: 2100,
              date: new Date('03-03-2023'),
            },
            {
              productId: 4,
              previousStoreStock: 50,
              previousWarehouseStock: 70,
              previousRetailPrice: 50,
              previousWholesalePrice: 500,
              updatedStoreStock: 60,
              updatedWarehouseStock: 80,
              updatedRetailPrice: 55,
              updatedWholesalePrice: 550,
              date: new Date('04-04-2023'),
            },
            {
              productId: 5,
              previousStoreStock: 70,
              previousWarehouseStock: 80,
              previousRetailPrice: 15,
              previousWholesalePrice: 100,
              updatedStoreStock: 80,
              updatedWarehouseStock: 90,
              updatedRetailPrice: 16,
              updatedWholesalePrice: 110,
              date: new Date('05-05-2023'),
            },
            {
              productId: 6,
              previousStoreStock: 70,
              previousWarehouseStock: 80,
              previousRetailPrice: 15,
              previousWholesalePrice: 100,
              updatedStoreStock: 80,
              updatedWarehouseStock: 90,
              updatedRetailPrice: 16,
              updatedWholesalePrice: 110,
              date: new Date('06-06-2023'),
            },
            {
              productId: 1,
              previousStoreStock: 30,
              previousWarehouseStock: 60,
              previousRetailPrice: 160,
              previousWholesalePrice: 1050,
              updatedStoreStock: 25,
              updatedWarehouseStock: 55,
              updatedRetailPrice: 155,
              updatedWholesalePrice: 1020,
              date: new Date('02-02-2023'),
            },
            {
              productId: 2,
              previousStoreStock: 40,
              previousWarehouseStock: 70,
              previousRetailPrice: 210,
              previousWholesalePrice: 5100,
              updatedStoreStock: 35,
              updatedWarehouseStock: 65,
              updatedRetailPrice: 205,
              updatedWholesalePrice: 5050,
              date: new Date('03-03-2023'),
            },
            {
              productId: 3,
              previousStoreStock: 50,
              previousWarehouseStock: 70,
              previousRetailPrice: 260,
              previousWholesalePrice: 2100,
              updatedStoreStock: 45,
              updatedWarehouseStock: 65,
              updatedRetailPrice: 255,
              updatedWholesalePrice: 2050,
              date: new Date('04-04-2023'),
            },
            {
              productId: 4,
              previousStoreStock: 60,
              previousWarehouseStock: 80,
              previousRetailPrice: 55,
              previousWholesalePrice: 550,
              updatedStoreStock: 55,
              updatedWarehouseStock: 75,
              updatedRetailPrice: 50,
              updatedWholesalePrice: 525,
              date: new Date('05-05-2023'),
            },
            {
              productId: 5,
              previousStoreStock: 80,
              previousWarehouseStock: 90,
              previousRetailPrice: 16,
              previousWholesalePrice: 110,
              updatedStoreStock: 75,
              updatedWarehouseStock: 85,
              updatedRetailPrice: 15,
              updatedWholesalePrice: 105,
              date: new Date('06-06-2023'),
            },
            {
              productId: 6,
              previousStoreStock: 80,
              previousWarehouseStock: 90,
              previousRetailPrice: 16,
              previousWholesalePrice: 110,
              updatedStoreStock: 75,
              updatedWarehouseStock: 85,
              updatedRetailPrice: 15,
              updatedWholesalePrice: 105,
              date: new Date('07-07-2023'),
            },
          ],
        })
        .then(() => {
          db.productLogs.findMany().then((result: any) => {
            console.log(result);
          });
        });
    }),

  db.classification
    .createMany({
      data: [
        {
          name: 'Fishing',
        },
        {
          name: 'Bait',
        },
      ],
    })
    .then(() => {
      db.classification.findMany().then((result: any) => {
        console.log(result);
      });
    }),

  db.customers
    .createMany({
      data: [
        {
          firstName: 'Mike',
          lastName: 'Wazowski',
          sex: 'MALE',
          contactNum: '0911111111',
          emailAddress: 'mikey@gmail.com',
          country: 'Zimbabwe',
          province: 'Karkita',
          municipality: 'Tiki-tiki',
          street: 'Karnavaugh Street',
          zipCode: 6060,
        },
        {
          firstName: 'Lightning',
          lastName: 'Mcqueen',
          sex: 'MALE',
          contactNum: '092222222',
          emailAddress: 'elmac@gmail.com',
          country: 'Australia',
          province: 'Syndey',
          municipality: 'Nottingham',
          street: '42nd',
          zipCode: 2120,
        },
      ],
    })
    .then(() => {
      db.customers.findMany().then((result: any) => {
        console.log(result);
      });
    }),

  db.suppliers
    .createMany({
      data: [
        {
          contactName: 'Raiden Shogun',
          businessName: 'DangoMilk',
          contactNum: '09123456789',
          emailAddress: 'eiTernity@gmail.com',
          country: 'Inazuma',
          province: 'Inazuma City',
          municipality: 'Tenryou Commission',
          street: '69th Street',
          zipCode: 6969,
        },
        {
          contactName: 'Ayaka Kamisato',
          businessName: 'ScrollArts',
          contactNum: '09133333333',
          emailAddress: 'traveler4ever@gmail.com',
          country: 'Inazuma',
          province: 'Inazuma City',
          municipality: 'Yashiro Commission',
          street: '420th Street',
          zipCode: 4209,
        },
      ],
    })
    .then(() => {
      db.suppliers.findMany().then((result: any) => {
        console.log(result);
      });
    }),
]).then(() =>
  Promise.all([
    db.classificationOnProducts
      .createMany({
        data: [
          {
            productId: 1,
            classificationId: 1,
          },
          { productId: 1, classificationId: 2 },
        ],
      })
      .then(() => {
        db.classificationOnProducts.findMany().then((result: any) => {
          console.log(result);
        });
      }),
  ]),
);
