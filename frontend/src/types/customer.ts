export type CustomerFromBackend = {
  id: number;
  firstName: string;
  lastName: string;
  sex: 'MALE' | 'FEMALE';
  contactNum: string;
  emailAddress: string;
  country: string;
  province: string;
  municipality: string;
  street: string;
  zipCode: number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerDocType = {
  id: string;
  firstName: string;
  lastName: string;
  sex: 'MALE' | 'FEMALE';
  contactNum?: string;
  emailAddress: string;
  country?: string;
  province?: string;
  municipality?: string;
  street?: string;
  zipCode?: number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
