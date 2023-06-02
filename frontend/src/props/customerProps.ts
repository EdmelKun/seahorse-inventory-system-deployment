import { Socket } from 'socket.io-client';
import { CustomerDocType } from '../types/customer';

export interface CustomerProps {
  customer: CustomerDocType;
  closeHandler: () => void;
  isOpen: boolean;
}

export interface CustomerSocket {
  socket: Socket;
}
