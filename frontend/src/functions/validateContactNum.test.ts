import checkNumber from './validateContactNum';

describe('validateContactNum.ts', () => {
  describe('Validate Contact Number', () => {
    it('works on numbers that start with +63', () => {
      expect(checkNumber('+63912345678')).toBeTruthy();
    });
    it('works on numbers that start with 09', () => {
      expect(checkNumber('0912345678')).toBeTruthy();
    });
    it('works on telephone numbers with area code', () => {
      expect(checkNumber('0331234567')).toBeTruthy();
    });
    it('cathces the numbers with improper format [1]', () => {
      expect(checkNumber('091234567')).toBeFalsy();
    });
    it('cathces the numbers with improper format [2]', () => {
      expect(checkNumber('09123456789')).toBeFalsy();
    });
    it('cathces the numbers with improper format [3]', () => {
      expect(checkNumber('+09123456789')).toBeFalsy();
    });
    it('cathces the numbers with improper format [4]', () => {
      expect(checkNumber('+630912345678')).toBeFalsy();
    });
    it('cathces the numbers with improper format [5]', () => {
      expect(checkNumber('+6391234567')).toBeFalsy();
    });
    it('cathces the numbers with improper format [6]', () => {
      expect(checkNumber('+639123456789')).toBeFalsy();
    });
    it('cathces the numbers with improper format [7]', () => {
      expect(checkNumber('63+912345678')).toBeFalsy();
    });
    it('cathces the numbers with improper character', () => {
      expect(checkNumber('❤️912345678')).toBeFalsy();
    });
  });
});
