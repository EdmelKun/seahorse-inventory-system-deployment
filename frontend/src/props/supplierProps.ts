import { Socket } from 'socket.io-client';
import { SupplierDocType } from '../types/supplier';

export interface AddSupplierProps {
  closeHandler: () => void;
  isOpen: boolean;
}

export interface SupplierProps {
  supplier: SupplierDocType;
  closeHandler: () => void;
  isOpen: boolean;
}

export interface SupplierSocket {
  socket: Socket;
}
