import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { AddClassificationProps } from '../props/classificationProps';
import classificationFormikSchema from '../formikSchema/classificationFormikSchema';
import mutateRxdb from '../rxdb/crudTools';
import { errorAlert } from '../functions/swalFunctions';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function AddClassification({
  closeHandler,
  isOpen,
}: AddClassificationProps) {
  const [success, setSuccess] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      classificationName: '',
    },
    validationSchema: classificationFormikSchema,
    onSubmit: async () => {
      mutateRxdb({
        table: 'CLASSIFICATION',
        type: 'ADD',
        dataInput: {
          name: values.classificationName,
        },
      })
        .then((result) => {
          if (result) {
            setSuccess(true);
          }
        })
        .then(closeHandler)
        .catch((error) => {
          let errorMessage = 'Unexpected Error';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          errorAlert(errorMessage);
        });
    },
  });

  const classNameError = !!(
    errors.classificationName && touched.classificationName
  );

  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="md">
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <Grid item>
            <DialogTitle fontWeight="bold">ADD CLASSIFICATION</DialogTitle>
          </Grid>
        </Grid>

        <DialogContent>
          <Grid container sx={{ justifyContent: 'center' }}>
            <TextField
              autoFocus
              margin="dense"
              id="classificationName"
              label="Classification Name"
              type="text"
              variant="outlined"
              value={values.classificationName}
              onChange={handleChange}
              error={classNameError}
              helperText={classNameError && errors.classificationName}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3 }}>
          <Grid container sx={{ justifyContent: 'center', gap: 5 }}>
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
              Cancel
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
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Add
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <SuccessNotification
        success={success}
        table="Classification"
        action="Added"
      />
      <NotificationContainer />
    </div>
  );
}
