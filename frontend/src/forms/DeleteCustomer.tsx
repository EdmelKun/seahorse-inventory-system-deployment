import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { errorAlert } from '../functions/swalFunctions';
import { CustomerProps } from '../props/customerProps';
import mutateRxdb from '../rxdb/crudTools';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function DeleteCustomer({
  customer,
  closeHandler,
  isOpen,
}: CustomerProps) {
  const [success, setSuccess] = useState(false);
  const handleDelete = async () => {
    mutateRxdb({
      table: 'CUSTOMER',
      type: 'DELETE',
      dataInput: customer,
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
        <DialogTitle id="alert-dialog-title">DELETE CUSTOMER</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this customer?
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
      <SuccessNotification
        success={success}
        table="Customer"
        action="Deleted"
      />
      <NotificationContainer />
    </div>
  );
}
