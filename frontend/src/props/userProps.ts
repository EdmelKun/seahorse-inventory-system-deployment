import { Socket } from 'socket.io-client';
import { UserDocType } from '../types/user';

export interface AddUserProps {
  isOpen: boolean;
  closeHandler: () => void;
}

// new interface to accomodate delete
export interface UserProps {
  isOpen: boolean;
  closeHandler: () => void;
  user: UserDocType;
}

export interface UserSocket {
  socket: Socket;
}
