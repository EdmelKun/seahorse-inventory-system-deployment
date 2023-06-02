import React, { useState, useEffect } from 'react';
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
  IconButton,
  FormHelperText,
  Box,
  Chip,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { EditProps } from '../props/productProps';
import { errorAlert } from '../functions/swalFunctions';
import mutateRxdb from '../rxdb/crudTools';
import productFormikSchema from '../formikSchema/productFormikSchema';
import {
  disableCharInput,
  validateInput,
} from '../functions/validateProductFields';
import selectAllData, { getClassificationOnProduct } from '../rxdb/selectTools';
import { ClassificationDocType as Classification } from '../types/classification';
import { ProductDocType } from '../types/product';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

interface Product
  extends Omit<ProductDocType, 'createdAt' | 'updatedAt' | 'active' | 'id'> {
  classification: string[];
}

export default function EditProductDetails({
  product,
  classifications,
  closeHandler,
  isOpen,
}: EditProps) {
  const [allClassifications, setAllClassifications] = useState<
    Classification[]
  >([]);
  const [success, setSuccess] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit } =
    useFormik<Product>({
      initialValues: {
        name: product.name,
        storeStock: product.storeStock,
        warehouseStock: product.warehouseStock,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        wholesaleAmount: product.wholesaleAmount,
        lowstockAlert: product.lowstockAlert,
        description: product.description,
        brand: product.brand,
        classification: classifications.map((e) => e.id),
      },
      validationSchema: productFormikSchema,
      onSubmit: async () => {
        await mutateRxdb({
          table: 'PRODUCT',
          type: 'UPDATE',
          dataInput: {
            id: product.id,
            name: values.name,
            storeStock: values.storeStock,
            warehouseStock: values.warehouseStock,
            retailPrice: values.retailPrice,
            wholesalePrice: values.wholesalePrice,
            wholesaleAmount: values.wholesaleAmount,
            lowstockAlert: values.lowstockAlert,
            description: values.description,
            brand: values.brand,
            active: true,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
          },
        })
          .then(async () => {
            allClassifications.map((classification) => {
              if (values.classification.includes(classification.id)) {
                return mutateRxdb({
                  table: 'CLASSIFICATION_ON_PRODUCTS',
                  type: 'ADD',
                  dataInput: {
                    classificationId: Number(classification.id),
                    productId: Number(product.id),
                  },
                });
              }
              return getClassificationOnProduct(
                Number(product.id),
                Number(classification.id),
              ).then((classificationOnProduct) =>
                mutateRxdb({
                  table: 'CLASSIFICATION_ON_PRODUCTS',
                  type: 'DELETE',
                  dataInput: classificationOnProduct,
                }),
              );
            });
          })
          .then(() => setSuccess(true))
          .then(closeHandler)
          .catch((error: Error) => {
            let errorMessage = 'Unexpected Error';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            errorAlert(errorMessage);
          });
      },
    });

  useEffect(() => {
    selectAllData('CLASSIFICATION').then((result) => {
      if (result) {
        setAllClassifications(result as Classification[]);
      }
    });
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

  return (
    <div>
      <Dialog open={isOpen} maxWidth="md" onClose={closeHandler} fullWidth>
        <DialogTitle fontWeight="bold">
          {values.name}
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
              margin="dense"
              id="name"
              label="Product Name"
              type="text"
              variant="outlined"
              onClick={(event: any) => event.target.select()}
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
              margin="dense"
              id="brand"
              label="Brand"
              type="text"
              variant="outlined"
              onClick={(event: any) => event.target.select()}
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
              <InputLabel id="classification" error={classificationError}>
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
                      const classification = allClassifications.find(
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
                {allClassifications.map((classification) => (
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
                multiline
                margin="dense"
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                maxRows={4}
                onClick={(event: any) => {
                  if (
                    event.target &&
                    typeof event.target.select === 'function'
                  ) {
                    event.target.select();
                  }
                }}
                sx={{
                  minWidth: 400,
                }}
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
                onChange={(e) => {
                  validateInput(e, 'lowstockAlert', handleChange);
                }}
                onKeyPress={(e) => disableCharInput(e, 'lowstockAlert')}
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
            <Grid sx={{ gridArea: 'foot', marginLeft: 1 }}>
              <TextField
                autoFocus
                margin="dense"
                id="warehouseStock"
                label="Warehouse Stock"
                type="number"
                variant="outlined"
                onClick={(event: any) => event.target.select()}
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
                margin="dense"
                id="storeStock"
                label="Store Stock"
                type="number"
                variant="outlined"
                onClick={(event: any) => event.target.select()}
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
            save
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessNotification success={success} table="Product" action="Edited" />
      <NotificationContainer />
    </div>
  );
}
