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
  Box,
  Chip,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { EditProps } from '../props/productProps';

import selectAllData from '../rxdb/selectTools';
import { ClassificationDocType as Classification } from '../types/classification';

export default function ViewProductDetails({
  product,
  classifications,
  closeHandler,
  isOpen,
}: EditProps) {
  const [classes, setClasses] = useState<Classification[]>([]);
  const classificationsId = classifications.map((e) => e.id);

  useEffect(() => {
    const getAllClassData = async () =>
      selectAllData('CLASSIFICATION')
        .then((result) => {
          if (result) {
            setClasses(result as Classification[]);
          }
        })
        .then(() => selectAllData('CLASSIFICATION_ON_PRODUCTS'));

    getAllClassData();
  }, []);

  const wholeNumberChecker = (price: number) => price % 1 === 0;

  return (
    <div>
      <Dialog open={isOpen} maxWidth="md" onClose={closeHandler} fullWidth>
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
              margin="dense"
              id="name"
              label="Product Name"
              variant="outlined"
              sx={{
                minWidth: 400,
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              defaultValue={product.name}
              disabled
            />
            <TextField
              margin="dense"
              id="brand"
              label="Brand"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              defaultValue={product.brand}
              disabled
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
              <InputLabel id="classification">Classification</InputLabel>
              <Select
                disabled
                name="classification"
                labelId="classification"
                id="classification"
                value={classificationsId || []}
                label="classification"
                multiple
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
                      backgroundColor: classificationsId.includes(
                        classification.id,
                      )
                        ? '#1976d2'
                        : 'inherit',
                      color: classificationsId.includes(classification.id)
                        ? '#ffffff'
                        : 'inherit',
                    }}
                  >
                    {classification.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
              }}
              disabled
              margin="dense"
              id="retailPrice"
              label="Retail Price"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={
                wholeNumberChecker(product.retailPrice)
                  ? `${product.retailPrice}.00`
                  : `${product.retailPrice}`
              }
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
              }}
              disabled
              margin="dense"
              id="wholesalePrice"
              label="Wholesale Price"
              type="text"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#565656',
                },
              }}
              value={
                wholeNumberChecker(product.wholesalePrice)
                  ? `${product.wholesalePrice}.00`
                  : `${product.wholesalePrice}`
              }
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
                disabled
                multiline
                margin="dense"
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                maxRows={4}
                sx={{
                  minWidth: 400,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#565656',
                  },
                }}
                InputProps={{ style: { height: 132 } }}
                defaultValue={product.description}
              />
            </Grid>
            <Grid container sx={{ gridArea: 'body', marginLeft: 1 }}>
              <TextField
                disabled
                margin="dense"
                id="lowStockAlert"
                label="Low Stock Alert"
                type="number"
                variant="outlined"
                sx={{
                  marginRight: 2,
                  width: 210,
                  height: 56,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#565656',
                  },
                }}
                defaultValue={product.lowstockAlert}
              />
              <TextField
                disabled
                margin="dense"
                id="wholesaleAmount"
                label="Wholesale Amount"
                type="number"
                variant="outlined"
                sx={{
                  width: 210,
                  height: 56,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#565656',
                  },
                }}
                defaultValue={product.wholesaleAmount}
              />
            </Grid>
            <Grid sx={{ gridArea: 'foot', marginLeft: 1 }}>
              <TextField
                disabled
                margin="dense"
                id="warehouseStock"
                label="Warehouse Stock"
                type="number"
                variant="outlined"
                sx={{
                  marginRight: 2,
                  width: 210,
                  height: 56,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#565656',
                  },
                }}
                defaultValue={product.warehouseStock}
              />
              <TextField
                disabled
                margin="dense"
                id="storeStock"
                label="Store Stock"
                type="number"
                variant="outlined"
                sx={{
                  width: 210,
                  height: 56,
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#565656',
                  },
                }}
                defaultValue={product.storeStock}
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
