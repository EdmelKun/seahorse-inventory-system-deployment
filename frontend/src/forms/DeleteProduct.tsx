import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteProps } from '../props/productProps';
import { errorAlert } from '../functions/swalFunctions';
import mutateRxdb from '../rxdb/crudTools';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function DeleteProduct({
  product,
  closeHandler,
  isOpen,
}: DeleteProps) {
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    mutateRxdb({
      table: 'PRODUCT',
      type: 'DELETE',
      dataInput: product,
    })
      .then(() => setSuccess(true))
      .then(closeHandler)
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">DELETE PRODUCT</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(249, 65, 4)',
                color: 'white',
                boxShadow: 6,
              },
            }}
            onClick={closeHandler}
          >
            NO
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249)',
                color: 'white',
                boxShadow: 6,
              },
            }}
            onClick={handleDelete}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessNotification success={success} table="Product" action="Deleted" />
      <NotificationContainer />
    </div>
  );
}
