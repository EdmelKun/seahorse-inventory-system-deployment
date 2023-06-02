export type SupplierFromBackend = {
  id: number;
  contactName: string;
  businessName: string;
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

export type SupplierDocType = {
  id: string;
  contactName: string;
  businessName: string;
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
