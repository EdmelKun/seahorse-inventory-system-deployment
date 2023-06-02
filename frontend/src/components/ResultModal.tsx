import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { ProductFromBackend } from '../types/product';
import { CustomerFromBackend } from '../types/customer';
import { SupplierFromBackend } from '../types/supplier';
import { ProductLogsFromBackend } from '../types/productLogs';
import { ClassificationFromBackend } from '../types/classification';
import { ClassificationOnProductsFromBackend } from '../types/classificationOnProducts';

import { destroyRxdb } from '../rxdb/crudTools';
// import { insertToRxdb } from '../rxdb/fetchData';
import fetchPsqlToRxdb, { insertToRxdb } from '../rxdb/fetchData';
// import { destroyRxdb } from '../rxdb/crudTools';

interface ProductMutationResult {
  success: boolean;
  data: ProductFromBackend;
}
interface CustomerMutationResult {
  success: boolean;
  data: CustomerFromBackend;
}

interface SupplierMutationResult {
  success: boolean;
  data: SupplierFromBackend;
}

interface ProductLogsMutationResult {
  success: boolean;
  data: ProductLogsFromBackend;
}

interface ClassificationMutationResult {
  success: boolean;
  data: ClassificationFromBackend;
}

interface ClassificationOnProductsMutationResult {
  success: boolean;
  data: ClassificationOnProductsFromBackend;
}

export interface Results {
  products: ProductMutationResult[];
  customers: CustomerMutationResult[];
  suppliers: SupplierMutationResult[];
  productLogs: ProductLogsMutationResult[];
  classifications: ClassificationMutationResult[];
  classificationsOnProducts: ClassificationOnProductsMutationResult[];
}
interface ResultProps {
  result: Results;
  openModal: boolean;

  closeHandler: () => void;
}

const getColor = (prev: number, current: number) => {
  if (prev !== current) {
    return prev < current ? 'green' : 'red';
  }
  return 'gray';
};
const wholeNumberChecker = (price: number) => price % 1 === 0;

export default function ResultModal({
  result,
  openModal,
  closeHandler,
}: ResultProps) {
  const { products, customers, suppliers, classifications, productLogs } =
    result;

  const productColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'success',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) =>
        params.value ? (
          <CheckCircleOutline color="success" />
        ) : (
          <ErrorOutline color="error" />
        ),
    },
  ];

  const classificationColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'success',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) =>
        params.value ? (
          <CheckCircleOutline color="success" />
        ) : (
          <ErrorOutline color="error" />
        ),
    },
  ];

  const productLogsColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'storeStocks',
      headerName: 'Store Stock',
      sortable: false,
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography color="gray">
              Previous: {params.row.previousStoreStock}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color={getColor(
                params.row.previousStoreStock,
                params.row.updatedStoreStock,
              )}
            >
              Updated: {params.row.updatedStoreStock}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'warehouseStocks',
      headerName: 'Warehouse Stock',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography color="gray">
              Previous: {params.row.previousWarehouseStock}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color={getColor(
                params.row.previousWarehouseStock,
                params.row.updatedWarehouseStock,
              )}
            >
              Updated: {params.row.updatedWarehouseStock}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'retailPrices',
      headerName: 'Retail Price',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography color="gray">
              Previous: ₱
              {wholeNumberChecker(params.row.previousRetailPrice)
                ? `${params.row.previousRetailPrice}.00`
                : params.row.previousRetailPrice}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color={getColor(
                params.row.previousRetailPrice,
                params.row.updatedRetailPrice,
              )}
            >
              Updated: ₱
              {wholeNumberChecker(params.row.updatedRetailPrice)
                ? `${params.row.updatedRetailPrice}.00`
                : params.row.updatedRetailPrice}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'wholesalePrices',
      headerName: 'Wholesale Price',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography color="gray">
              Previous: ₱
              {wholeNumberChecker(params.row.previousWholesalePrice)
                ? `${params.row.previousWholesalePrice}.00`
                : params.row.previousWholesalePrice}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color={getColor(
                params.row.previousWholesalePrice,
                params.row.updatedWholesalePrice,
              )}
            >
              Updated: ₱
              {wholeNumberChecker(params.row.updatedWholesalePrice)
                ? `${params.row.updatedWholesalePrice}.00`
                : params.row.updatedWholesalePrice}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography color="gray">
              {params.row.date.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      field: 'success',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) =>
        params.value ? (
          <CheckCircleOutline color="success" />
        ) : (
          <ErrorOutline color="error" />
        ),
    },
  ];

  const customerColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'sex',
      headerName: 'Sex',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'contactNum',
      headerName: 'Contact Number',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'success',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) =>
        params.value ? (
          <CheckCircleOutline color="success" />
        ) : (
          <ErrorOutline color="error" />
        ),
    },
  ];

  const supplierColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'contactName',
      headerName: "Contact Person's Name",
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'businessName',
      headerName: 'Business Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'contactNum',
      headerName: "Contact Person's Number",
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'success',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) =>
        params.value ? (
          <CheckCircleOutline color="success" />
        ) : (
          <ErrorOutline color="error" />
        ),
    },
  ];

  return (
    <div>
      <Dialog open={openModal} onClose={closeHandler} maxWidth="md">
        <DialogTitle fontWeight="bold">SYNC RESULT DATA</DialogTitle>
        <DialogContent>
          {products.length > 0 && (
            <>
              <DialogContentText fontWeight="bold">Products</DialogContentText>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  marginBottom: 1,
                }}
              >
                <DataGrid
                  hideFooterSelectedRowCount
                  disableSelectionOnClick
                  sx={{
                    justifyContent: 'flex-start',
                    height: '50vh',
                    width: '55vw',
                    overflowX: 'scroll', // added for side scroller
                    '& .customHeader': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      fontSize: 'larger',
                      fontWeight: 'bold',
                    },
                  }}
                  rows={
                    products.map((e) => ({
                      ...e.data,
                      success: e.success,
                    })) ?? []
                  }
                  columns={productColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Products Found' }}
                />
              </Box>
            </>
          )}
          {productLogs.length > 0 && (
            <>
              <DialogContentText fontWeight="bold">
                Product Logs
              </DialogContentText>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  marginBottom: 1,
                }}
              >
                <DataGrid
                  hideFooterSelectedRowCount
                  disableSelectionOnClick
                  sx={{
                    justifyContent: 'flex-start',
                    height: '50vh',
                    width: '55vw',
                    overflowX: 'scroll', // added for side scroller
                    '& .customHeader': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      fontSize: 'larger',
                      fontWeight: 'bold',
                    },
                  }}
                  rows={
                    productLogs.map((e) => ({
                      ...e.data,
                      success: e.success,
                    })) ?? []
                  }
                  columns={productLogsColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Products Logs Found' }}
                />
              </Box>
            </>
          )}
          {classifications.length > 0 && (
            <>
              <DialogContentText marginTop={3} fontWeight="bold">
                Classification
              </DialogContentText>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  marginBottom: 1,
                }}
              >
                <DataGrid
                  hideFooterSelectedRowCount
                  disableSelectionOnClick
                  checkboxSelection
                  sx={{
                    justifyContent: 'flex-start',
                    height: '50vh',
                    width: '55vw',
                    overflowX: 'scroll', // added for side scroller
                    '& .customHeader': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      fontSize: 'larger',
                      fontWeight: 'bold',
                    },
                  }}
                  rows={
                    classifications.map((e) => ({
                      ...e.data,
                      success: e.success,
                    })) ?? []
                  }
                  columns={classificationColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Classification Found' }}
                />
              </Box>
            </>
          )}

          {customers.length > 0 && (
            <>
              <DialogContentText marginTop={3} fontWeight="bold">
                Customer
              </DialogContentText>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  marginBottom: 1,
                }}
              >
                <DataGrid
                  hideFooterSelectedRowCount
                  disableSelectionOnClick
                  sx={{
                    justifyContent: 'flex-start',
                    height: '50vh',
                    width: '55vw',
                    overflowX: 'scroll', // added for side scroller
                    '& .customHeader': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      fontSize: 'larger',
                      fontWeight: 'bold',
                    },
                  }}
                  rows={
                    customers.map((e) => ({
                      ...e.data,
                      success: e.success,
                    })) ?? []
                  }
                  columns={customerColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Customers Found' }}
                />
              </Box>
            </>
          )}

          {suppliers.length > 0 && (
            <>
              <DialogContentText marginTop={3} fontWeight="bold">
                Supplier
              </DialogContentText>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  marginBottom: 1,
                }}
              >
                <DataGrid
                  hideFooterSelectedRowCount
                  disableSelectionOnClick
                  sx={{
                    justifyContent: 'flex-start',
                    height: '50vh',
                    width: '55vw',
                    overflowX: 'scroll', // added for side scroller
                    '& .customHeader': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      fontSize: 'larger',
                      fontWeight: 'bold',
                    },
                  }}
                  rows={
                    suppliers.map((e) => ({
                      ...e.data,
                      success: e.success,
                    })) ?? []
                  }
                  columns={supplierColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Suppliers Found' }}
                />
              </Box>
            </>
          )}
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
            onClick={() => {
              closeHandler();
              destroyRxdb().then(() =>
                fetchPsqlToRxdb().then((data) => insertToRxdb(data)),
              );
            }}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
