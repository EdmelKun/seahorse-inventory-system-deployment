import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { errorAlert } from '../functions/swalFunctions';
import { EditClassificationProps } from '../props/classificationProps';
import mutateRxdb from '../rxdb/crudTools';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function DeleteClassification({
  classification,
  closeHandler,
  isOpen,
}: EditClassificationProps) {
  const [success, setSuccess] = useState(false);
  const handleDelete = async () => {
    mutateRxdb({
      table: 'CLASSIFICATION',
      type: 'DELETE',
      dataInput: classification,
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
        <DialogTitle id="alert-dialog-title">DELETE CLASSIFICATION</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this classification?
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
        table="Classification"
        action="Deleted"
      />
      <NotificationContainer />
    </div>
  );
}
