import { Socket } from 'socket.io-client';
// import { RxDatabase } from 'rxdb';
import { ProductDocType } from '../types/product';
import { ClassificationDocType } from '../types/classification';
// import { Collections } from '../rxdb/initializeRxdb1';

export interface AddProps {
  closeHandler: () => void;
  isOpen: boolean;
}

export interface EditProps {
  product: ProductDocType;
  classifications: ClassificationDocType[];
  closeHandler: () => void;
  isOpen: boolean;
}

export interface EditPriceOrStockProps {
  product: ProductDocType;
  closeHandler: () => void;
  isOpen: boolean;
}

export interface DeleteProps {
  product: ProductDocType;
  closeHandler: () => void;
  isOpen: boolean;
}

export interface ProductProps {
  socket: Socket;
  // dbp: Promise<RxDatabase<Collections, any, any>>;
}
