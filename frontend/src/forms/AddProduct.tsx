import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
  Box,
  Chip,
  InputAdornment,
} from '@mui/material';

import { useFormik } from 'formik';
import { AddProps } from '../props/productProps';
import { errorAlert } from '../functions/swalFunctions';
import mutateRxdb from '../rxdb/crudTools';
import productFormikSchema from '../formikSchema/productFormikSchema';
import {
  disableCharInput,
  validateInput,
} from '../functions/validateProductFields';
import selectAllData from '../rxdb/selectTools';
import { ClassificationDocType as Classification } from '../types/classification';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function AddProduct({ closeHandler, isOpen }: AddProps) {
  const [classes, setClasses] = useState<Classification[]>([]);
  const [success, setSuccess] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      storeStock: '',
      warehouseStock: '',
      retailPrice: '',
      wholesalePrice: '',
      wholesaleAmount: '',
      lowstockAlert: '',
      description: '',
      brand: '',
      classification: [] as string[],
    },
    validationSchema: productFormikSchema,
    onSubmit: async () => {
      mutateRxdb({
        table: 'PRODUCT',
        type: 'ADD',
        dataInput: {
          name: values.name,
          storeStock: Number(values.storeStock),
          warehouseStock: Number(values.warehouseStock),
          retailPrice: Number(values.retailPrice),
          wholesalePrice: Number(values.wholesalePrice),
          wholesaleAmount: Number(values.wholesaleAmount),
          lowstockAlert: Number(values.lowstockAlert),
          description: values.description,
          brand: values.brand,
        },
      })
        .then(async (result) => {
          if (result) {
            values.classification.map((id) =>
              mutateRxdb({
                table: 'CLASSIFICATION_ON_PRODUCTS',
                type: 'ADD',
                dataInput: {
                  classificationId: Number(id),
                  productId: Number(result.id),
                },
              }),
            );
          }
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

  useEffect(() => {
    const getAllClassData = async () =>
      selectAllData('CLASSIFICATION')
        .then((result) => setClasses(result as Classification[]))
        .then(() => selectAllData('CLASSIFICATION_ON_PRODUCTS'));

    getAllClassData();
  }, []);

  const productNameError = !!(errors.name && touched.name);
  const brandError = !!(errors.brand && touched.brand);
  const classificationError = !!(
    errors.classification && touched.classification
  );
  const storeStockError = !!(errors.storeStock && touched.storeStock);
  const warehouseStockError = !!(
    errors.warehouseStock && touched.warehouseStock
  );
  const retailPriceError = !!(errors.retailPrice && touched.retailPrice);
  const wholesalePriceError = !!(
    errors.wholesalePrice && touched.wholesalePrice
  );
  const lowstockAlertError = !!(errors.lowstockAlert && touched.lowstockAlert);
  const wholesaleAmountError = !!(
    errors.wholesaleAmount && touched.wholesaleAmount
  );
  const descriptionError = !!(errors.description && touched.description);

  // const handleChipDelete = (e: any) => {
  //   console.log('Classification deleted', e.target.value);
  // };

  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">ADD PRODUCT</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight="bold">
            Product Information
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
              autoFocus
              required
              margin="dense"
              id="name"
              label="Product Name"
              type="text"
              variant="outlined"
              sx={{
                minWidth: 400,
              }}
              value={values.name}
              onChange={handleChange}
              error={productNameError}
              helperText={productNameError && errors.name}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="brand"
              label="Brand"
              type="text"
              variant="outlined"
              value={values.brand}
              onChange={handleChange}
              error={brandError}
              helperText={brandError && errors.brand}
            />
          </Grid>
          <Grid
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              marginBottom: 1,
            }}
          >
            <FormControl sx={{ mt: 1, minWidth: 400 }} size="medium">
              <InputLabel
                id="classification"
                error={classificationError}
                required
              >
                Classification
              </InputLabel>
              <Select
                name="classification"
                labelId="classification"
                id="classification"
                value={values.classification || []}
                label="classification"
                multiple
                onChange={handleChange}
                error={classificationError}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected || []).map((value) => {
                      const classification = classes.find(
                        (c) => c.id === value.toString(),
                      );
                      return (
                        <Chip
                          key={value}
                          data-value={value}
                          label={classification?.name}
                          // onDelete={handleChipDelete}
                          component="div"
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {classes.map((classification) => (
                  <MenuItem
                    key={classification.id}
                    value={classification.id}
                    style={{
                      backgroundColor: values.classification.includes(
                        classification.id,
                      )
                        ? '#1976d2'
                        : 'inherit',
                      color: values.classification.includes(classification.id)
                        ? '#ffffff'
                        : 'inherit',
                    }}
                  >
                    {classification.name}
                  </MenuItem>
                ))}
              </Select>
              {classificationError && (
                <FormHelperText sx={{ color: '#d32f2f' }}>
                  {errors.classification?.toString()}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
                sx: {
                  '& input': {
                    '&::placeholder': {
                      color: retailPriceError ? '#d32f2f' : '',
                      fontSize: '14px',
                    },
                  },
                },
              }}
              autoFocus
              required
              placeholder="Enter Retail Price"
              margin="dense"
              type="number"
              id="retailPrice"
              label="Retail Price"
              variant="outlined"
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
                sx: {
                  '& input': {
                    '&::placeholder': {
                      color: wholesalePriceError ? '#d32f2f' : '',
                      fontSize: '14px',
                    },
                  },
                },
              }}
              autoFocus
              required
              placeholder="Enter Wholesale Price"
              margin="dense"
              id="wholesalePrice"
              label="Wholesale Price"
              type="number"
              variant="outlined"
              value={values.wholesalePrice}
              error={wholesalePriceError}
              helperText={wholesalePriceError && errors.wholesalePrice}
              onChange={(e) => validateInput(e, 'wholesalePrice', handleChange)}
              onKeyPress={(e) => disableCharInput(e, 'wholesalePrice')}
            />
          </Grid>
          <Grid
            container
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateAreas: `
                            "head head body"
                            "head head foot"
                            `,
            }}
          >
            <Grid container sx={{ gridArea: 'head' }}>
              <TextField
                autoFocus
                required
                multiline
                margin="dense"
                id="description"
                label="Description"
                type="text"
                maxRows={4}
                variant="outlined"
                sx={{ minWidth: 400 }}
                InputProps={{ style: { height: 132 } }}
                value={values.description}
                error={descriptionError}
                helperText={descriptionError && errors.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid container sx={{ gridArea: 'body', marginLeft: 1 }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="lowstockAlert"
                label="Low Stock Alert"
                type="number"
                variant="outlined"
                sx={{
                  marginRight: 2,
                  width: 210,
                  height: 56,
                }}
                value={values.lowstockAlert}
                error={lowstockAlertError}
                helperText={lowstockAlertError && errors.lowstockAlert}
                onChange={(e) =>
                  validateInput(e, 'lowstockAlert', handleChange)
                }
                onKeyPress={(e) => disableCharInput(e, 'lowstockAlert')}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="wholesaleAmount"
                label="Wholesale Amount"
                type="number"
                variant="outlined"
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
            <Grid sx={{ gridArea: 'foot', marginLeft: 1 }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="warehouseStock"
                label="Warehouse Stock"
                type="number"
                variant="outlined"
                sx={{
                  marginRight: 2,
                  width: 210,
                  height: 56,
                }}
                value={values.warehouseStock}
                error={warehouseStockError}
                helperText={warehouseStockError && errors.warehouseStock}
                onChange={(e) =>
                  validateInput(e, 'warehouseStock', handleChange)
                }
                onKeyPress={(e) => disableCharInput(e, 'warehouseStock')}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="storeStock"
                label="Store Stock"
                type="number"
                variant="outlined"
                sx={{
                  width: 210,
                  height: 56,
                }}
                value={values.storeStock}
                error={storeStockError}
                helperText={storeStockError && errors.storeStock}
                onChange={(e) => validateInput(e, 'storeStock', handleChange)}
                onKeyPress={(e) => disableCharInput(e, 'storeStock')}
              />
            </Grid>
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessNotification success={success} table="Product" action="Added" />
      <NotificationContainer />
    </div>
  );
}
