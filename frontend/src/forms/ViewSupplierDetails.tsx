import React from 'react';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { SupplierProps } from '../props/supplierProps';

export default function ViewSupplierDetails({
  supplier,
  closeHandler,
  isOpen,
}: SupplierProps) {
  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">
          {supplier.contactName}{' '}
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
            Business Information
          </DialogContentText>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
              marginBottom: 1,
            }}
          >
            <TextField
              disabled
              margin="dense"
              id="contactName"
              label="Contact Person's Name"
              type="text"
              variant="outlined"
              value={supplier.contactName}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
            <TextField
              disabled
              margin="dense"
              id="businessName"
              label="Business Name"
              type="text"
              variant="outlined"
              value={supplier.businessName}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
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
              value={supplier.contactNum}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
            <TextField
              disabled
              margin="dense"
              id="emailAddress"
              label="Email Address"
              type="email"
              variant="outlined"
              value={supplier.emailAddress}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
          </Box>
          <DialogContentText marginTop={3} fontWeight="bold">
            Business Address Information
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
              value={supplier.country}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />

            <TextField
              disabled
              margin="dense"
              id="province"
              label="State/Province"
              type="text"
              variant="outlined"
              value={supplier.province}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
            <TextField
              disabled
              margin="dense"
              id="zipCode"
              label="Zip Code"
              type="number"
              variant="outlined"
              value={supplier.zipCode}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
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
              value={supplier.municipality}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
            <TextField
              disabled
              margin="dense"
              id="street"
              label="Street Address"
              type="text"
              variant="outlined"
              value={supplier.street}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
