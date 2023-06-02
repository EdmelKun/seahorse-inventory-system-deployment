import React from 'react';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { CustomerProps } from '../props/customerProps';

export default function ViewCustomerDetails({
  customer,
  closeHandler,
  isOpen,
}: CustomerProps) {
  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">
          {customer.firstName} {customer.lastName}{' '}
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
              disabled
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.firstName}
            />
            <TextField
              disabled
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.lastName}
            />
            <FormControl sx={{ mt: 1, maxWidth: 150 }} size="medium">
              <InputLabel id="sex">Sex</InputLabel>
              <Select
                disabled
                name="sex"
                labelId="demo-select-small"
                id="sex"
                value={customer.sex || ''}
                label="Sex"
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#565656',
                  },
                }}
              >
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="FEMALE">FEMALE</MenuItem>
              </Select>
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
              disabled
              margin="dense"
              id="contactNum"
              label="Contact Number"
              type="tel"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.contactNum}
            />
            <TextField
              disabled
              margin="dense"
              id="emailAddress"
              label="Email Address"
              type="email"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.emailAddress}
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
              disabled
              margin="dense"
              id="country"
              label="Country"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.country}
            />
            <TextField
              disabled
              margin="dense"
              id="province"
              label="State/Province"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.province}
            />
            <TextField
              disabled
              margin="dense"
              id="zipCode"
              label="Zip Code"
              type="number"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.zipCode}
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
              disabled
              margin="dense"
              id="municipality"
              label="City/Municipality"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.municipality}
            />
            <TextField
              disabled
              margin="dense"
              id="street"
              label="Street Address"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={customer.street}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
