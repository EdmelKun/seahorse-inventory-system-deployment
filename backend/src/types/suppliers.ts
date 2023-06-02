export interface CreateSupplier {
  contactName: string;
  businessName: string;
  contactNum: string;
  emailAddress: string;
  country: string;
  province: string;
  municipality: string;
  street: string;
  zipCode: number;
}

export interface SupplierMutation {
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
  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateSupplier {
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
}
