const checkNumber = (contactNum: string) =>
  /(^((\+639)|(09))[\d]{8}$)|(^[\d]{10}$)/g.test(contactNum);

export default checkNumber;
