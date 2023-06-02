export type UserDocType = {
  id: number;
  password: string;
  username: string;
  admin: string;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};
