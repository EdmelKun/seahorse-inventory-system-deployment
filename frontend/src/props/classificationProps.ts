import { ClassificationDocType } from '../types/classification';

export interface ClassificationProps {
  isOpen: boolean;
  closeHandler: () => void;
}

export interface AddClassificationProps {
  isOpen: boolean;
  closeHandler: () => void;
}

export interface EditClassificationProps {
  classification: ClassificationDocType;
  isOpen: boolean;
  closeHandler: () => void;
}
