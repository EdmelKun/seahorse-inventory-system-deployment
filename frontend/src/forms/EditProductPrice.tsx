import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { EditPriceOrStockProps } from '../props/productProps';
import { errorAlert } from '../functions/swalFunctions';
import mutateRxdb from '../rxdb/crudTools';
import { editProductLogsFormikSchema } from '../formikSchema/productFormikSchema';
import {
  disableCharInput,
  validateInput,
} from '../functions/validateProductFields';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function EditProductPrice({
  product,
  closeHandler,
  isOpen,
}: EditPriceOrStockProps) {
  const [success, setSuccess] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      storeStock: product.storeStock,
      warehouseStock: product.warehouseStock,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      wholesaleAmount: product.wholesaleAmount,
    },
    validationSchema: editProductLogsFormikSchema,
    onSubmit: async () => {
      mutateRxdb({
        table: 'PRODUCT',
        type: 'UPDATE',
        dataInput: {
          id: product.id,
          name: product.name,
          storeStock: values.storeStock,
          warehouseStock: values.warehouseStock,
          retailPrice: values.retailPrice,
          wholesalePrice: values.wholesalePrice,
          wholesaleAmount: values.wholesaleAmount,
          lowstockAlert: product.lowstockAlert,
          description: product.description,
          brand: product.brand,
          active: true,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
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
    },
  });

  const retailPriceError = !!(errors.retailPrice && touched.retailPrice);
  const wholesalePriceError = !!(
    errors.wholesalePrice && touched.wholesalePrice
  );
  const wholesaleAmountError = !!(
    errors.wholesaleAmount && touched.wholesaleAmount
  );

  return (
    <div>
      <Dialog open={isOpen} maxWidth="sm" onClose={closeHandler}>
        <DialogTitle fontWeight="bold">
          {product.name}
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={closeHandler}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight="bold">
            Product Pricing
          </DialogContentText>

          <Grid
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              marginBottom: 1,
            }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
              }}
              autoFocus
              margin="dense"
              id="retailPrice"
              label="Retail Price"
              type="number"
              variant="outlined"
              onClick={(event: any) => event.target.select()}
              value={values.retailPrice}
              error={retailPriceError}
              helperText={retailPriceError && errors.retailPrice}
              onChange={(e) => validateInput(e, 'retailPrice', handleChange)}
              onKeyPress={(e) => disableCharInput(e, 'retailPrice')}
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
              }}
              autoFocus
              margin="dense"
              id="wholesalePrice"
              label="Wholesale Price"
              type="number"
              variant="outlined"
              onClick={(event: any) => event.target.select()}
              value={values.wholesalePrice}
              error={wholesalePriceError}
              helperText={wholesalePriceError && errors.wholesalePrice}
              onChange={(e) => validateInput(e, 'wholesalePrice', handleChange)}
              onKeyPress={(e) => disableCharInput(e, 'wholesalePrice')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="wholesaleAmount"
              label="Wholesale Amount"
              type="number"
              variant="outlined"
              onClick={(event: any) => event.target.select()}
              sx={{
                width: 210,
                height: 56,
              }}
              value={values.wholesaleAmount}
              error={wholesaleAmountError}
              helperText={wholesaleAmountError && errors.wholesaleAmount}
              onChange={(e) =>
                validateInput(e, 'wholesaleAmount', handleChange)
              }
              onKeyPress={(e) => disableCharInput(e, 'wholesaleAmount')}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3, paddingRight: 3 }}>
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessNotification
        success={success}
        table="Product Price"
        action="Edited"
      />
      <NotificationContainer />
    </div>
  );
}
