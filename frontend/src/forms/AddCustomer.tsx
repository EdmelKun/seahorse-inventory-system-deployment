import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import { CustomerProps } from '../props/customerProps';
import mutateRxdb from '../rxdb/crudTools';
import { errorAlert } from '../functions/swalFunctions';
import customerFormikSchema from '../formikSchema/customerFormikSchema';
import {
  disableCharInput,
  validateInput,
} from '../functions/validateProductFields';
import { SuccessNotification } from '../functions/toastFunctions';
import NotificationContainer from '../components/NotificationContainer';

export default function AddCustomer({
  customer,
  closeHandler,
  isOpen,
}: CustomerProps) {
  const [success, setSuccess] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      sex: customer.sex,
      emailAddress: '',
      contactNum: '',
      country: '',
      province: '',
      municipality: '',
      street: '',
      zipCode: '',
    },
    validationSchema: customerFormikSchema,
    onSubmit: async () => {
      mutateRxdb({
        table: 'CUSTOMER',
        type: 'ADD',
        dataInput: {
          firstName: values.firstName,
          lastName: values.lastName,
          sex: values.sex,
          emailAddress: values.emailAddress,
          contactNum: values.contactNum,
          country: values.country,
          province: values.province,
          municipality: values.municipality,
          street: values.street,
          zipCode: Number(values.zipCode),
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

  const firstNameError = !!(errors.firstName && touched.firstName);
  const lastNameError = !!(errors.lastName && touched.lastName);
  const sexError = !!(errors.sex && touched.sex);
  const emailAddressError = !!(errors.emailAddress && touched.emailAddress);
  const contactNumError = !!(errors.contactNum && touched.contactNum);
  const countryError = !!(errors.country && touched.country);
  const provinceError = !!(errors.province && touched.province);
  const municipalityError = !!(errors.municipality && touched.municipality);
  const streetError = !!(errors.street && touched.street);
  const zipCodeError = !!(errors.zipCode && touched.zipCode);

  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">ADD CUSTOMER</DialogTitle>
        <DialogContent>
          <DialogContentText fontWeight="bold">
            Personal Information
          </DialogContentText>
          <Box
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
              id="firstName"
              label="First Name"
              type="text"
              variant="outlined"
              value={values.firstName}
              onChange={handleChange}
              error={firstNameError}
              helperText={firstNameError && errors.firstName}
            />

            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              variant="outlined"
              value={values.lastName}
              onChange={handleChange}
              error={lastNameError}
              helperText={lastNameError && errors.lastName}
            />
            <FormControl sx={{ mt: 1, maxWidth: 150 }} size="medium">
              <InputLabel error={sexError} id="sex">
                Sex
              </InputLabel>
              <Select
                name="sex"
                labelId="sex"
                id="sex"
                value={values.sex || ''}
                label="sex"
                onChange={handleChange}
                error={sexError}
              >
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="FEMALE">FEMALE</MenuItem>
              </Select>
              {sexError && (
                <FormHelperText sx={{ color: '#d32f2f' }}>
                  {errors.sex}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box
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
              id="contactNum"
              label="Contact Number"
              type="tel"
              variant="outlined"
              value={values.contactNum}
              onChange={handleChange}
              error={contactNumError}
              helperText={contactNumError && errors.contactNum}
              onKeyPress={(e) => disableCharInput(e, 'contactNum')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="emailAddress"
              label="Email Address"
              type="email"
              variant="outlined"
              value={values.emailAddress}
              onChange={handleChange}
              error={emailAddressError}
              helperText={emailAddressError && errors.emailAddress}
            />
          </Box>
          <DialogContentText marginTop={3} fontWeight="bold">
            Address Information
          </DialogContentText>
          <Box
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
              id="country"
              label="Country"
              type="text"
              variant="outlined"
              value={values.country}
              onChange={handleChange}
              error={countryError}
              helperText={countryError && errors.country}
            />
            <TextField
              autoFocus
              margin="dense"
              id="province"
              label="State/Province"
              type="text"
              variant="outlined"
              value={values.province}
              onChange={handleChange}
              error={provinceError}
              helperText={provinceError && errors.province}
            />
            <TextField
              autoFocus
              margin="dense"
              id="zipCode"
              label="Zip Code"
              type="number"
              variant="outlined"
              value={values.zipCode}
              error={zipCodeError}
              helperText={zipCodeError && errors.zipCode}
              onChange={(e) => validateInput(e, 'zipCode', handleChange)}
              onKeyPress={(e) => disableCharInput(e, 'zipCode')}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="municipality"
              label="City/Municipality"
              type="text"
              variant="outlined"
              value={values.municipality}
              onChange={handleChange}
              error={municipalityError}
              helperText={municipalityError && errors.municipality}
            />
            <TextField
              autoFocus
              margin="dense"
              id="street"
              label="Street Address"
              type="text"
              variant="outlined"
              value={values.street}
              onChange={handleChange}
              error={streetError}
              helperText={streetError && errors.street}
            />
          </Box>
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
      <SuccessNotification success={success} table="Customer" action="Added" />
      <NotificationContainer />
    </div>
  );
}
