export interface Credentials {
  username: string;
  password: string;
}

export interface CreateUser {
  username: string;
  password: string;
  admin: boolean;
}

export interface UserMutation {
  id: number;
  username: string;
  password: string;

  action: 'ADD' | 'DELETE' | 'UPDATE';

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUser {
  id: number;
  username: string;
  password: string;
  admin: boolean;
}
