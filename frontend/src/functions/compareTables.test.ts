import { ProductFromBackend, ProductDocType } from '../types/product';
// import isSimilar from './compareTables';
import x from './compareTables';

describe.skip('productTools.ts', () => {
  it('skips', () => {
    expect(1).toBe(1);
  });
  // describe('isSame function', () => {
  //   test('works with object arrays', () => {
  //     const productsFromBackend = [
  //       {
  //         id: 4,
  //         updatedAt: new Date(1, 10, 2022, 2, 0, 0, 0),
  //       },
  //       // {
  //       //   id: 6,
  //       //   updatedAt: new Date(1, 10, 2022, 2, 0, 0, 0),
  //       // },
  //     ] as ProductFromBackend[];
  //     const productsFromRxdb = [
  //       {
  //         id: '4',
  //         updatedAt: new Date(1, 10, 2022, 2, 0, 0, 0),
  //       },
  //       // {
  //       //   id: '6',
  //       //   updatedAt: new Date(11, 10, 2022, 2, 0, 0, 0),
  //       // },
  //     ] as ProductDocType[];
  //     expect(x(productsFromRxdb, productsFromBackend)).toBeTruthy();
  //   });
  // });
});
