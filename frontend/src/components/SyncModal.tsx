import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridSelectionModel,
  GridColDef,
} from '@mui/x-data-grid';
import fetchMutateData, {
  QueueCollectionData,
  // getAllQueueCollections,
} from '../rxdb/fetchMutation';
import LoadingBackdrop from './LoadingBackdrop';
import { ClassificationDocType as Classification } from '../types/classification';
import { ProductDocType as Product } from '../types/product';
import { CustomerDocType as Customer } from '../types/customer';
import { SupplierDocType as Supplier } from '../types/supplier';

import { errorAlert } from '../functions/swalFunctions';
import { findDataById, showClassificationOnProduct } from '../rxdb/selectTools';
import ViewProductDetails from '../forms/ViewProductDetails';
import ViewCustomerDetails from '../forms/ViewCustomerDetails';
import ViewSupplierDetails from '../forms/ViewSupplierDetails';

import ResultModal, { Results } from './ResultModal';

interface SyncModalProps {
  open: boolean;
  closeHandler: () => void;
  queueCollection: QueueCollectionData;
}

const getColor = (prev: number, current: number) => {
  if (prev !== current) {
    return prev < current ? 'green' : 'red';
  }
  return 'gray';
};
const wholeNumberChecker = (price: number) => price % 1 === 0;

export default function SyncModal({
  open,
  closeHandler,
  queueCollection,
}: SyncModalProps) {
  const [openLoading, setOpenLoading] = useState(false);

  const rowProductData = queueCollection.products;
  const rowProductLogsData = queueCollection.productLogs;

  const rowCustomerData = queueCollection.customers;
  const rowSupplierData = queueCollection.suppliers;
  const rowClassificationData = queueCollection.classifications;

  const [selectedProducts, setSelectedProducts] = useState<GridSelectionModel>(
    [],
  );
  const [selectedProductLogs, setSelectedProductLogs] =
    useState<GridSelectionModel>([]);
  const [selectedCustomers, setSelectedCustomers] =
    useState<GridSelectionModel>([]);

  const [selectedSuppliers, setSelectedSuppliers] =
    useState<GridSelectionModel>([]);

  const [selectedClassifications, setSelectedClassifications] =
    useState<GridSelectionModel>([]);

  const [result, setResult] = useState<Results>({
    products: [],
    suppliers: [],
    customers: [],
    productLogs: [],
    classifications: [],
    classificationsOnProducts: [],
  });

  const [rowProduct, setRowProduct] = useState({} as Product);
  const [rowClassifications, setRowClassifications] = useState<
    Classification[]
  >([]);
  const [rowCustomer, setRowCustomer] = useState({} as Customer);
  const [rowSupplier, setRowSupplier] = useState({} as Supplier);

  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
  const [openSupplierDetails, setOpenSupplierDetails] = useState(false);

  const [openResultModal, setOpenResultModal] = useState(false);

  const viewHandler = async (
    event: any,
    table: 'PRODUCT' | 'CUSTOMER' | 'SUPPLIER',
  ) =>
    new Promise((res, rej) => {
      switch (table) {
        case 'PRODUCT': {
          res(
            findDataById(event.id, 'PRODUCT')
              .then((data) => setRowProduct(data! as Product))
              .then(() => showClassificationOnProduct(Number(event.id)))
              .then((e) => {
                if (e) {
                  setRowClassifications(e);
                }
              })
              .then(() => setOpenProductDetails(!openProductDetails)),
          );
          break;
        }
        case 'CUSTOMER': {
          res(
            findDataById(event.id, 'CUSTOMER')
              .then((data) => setRowCustomer(data! as Customer))
              .then(() => setOpenCustomerDetails(!openCustomerDetails)),
          );
          break;
        }
        case 'SUPPLIER': {
          res(
            findDataById(event.id, 'SUPPLIER')
              .then((data) => setRowSupplier(data! as Supplier))
              .then(() => setOpenSupplierDetails(!openSupplierDetails)),
          );
          break;
        }
        default:
          rej(new Error('Something went wrong'));
          break;
      }
    }).catch((error) => {
      let errorMessage = 'Unexpected Error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      errorAlert(errorMessage);
    });

  const productColumns: GridColDef[] = [
    {
      field: 'view',
      headerName: '',
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center' }}>
          <Button
            startIcon={<VisibilityIcon />}
            variant="outlined"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
            }}
            onClick={() => {
              viewHandler(params.row, 'PRODUCT');
            }}
          >
            View
          </Button>
        </Grid>
      ),
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      hide: true,
    },
    {
      field: 'action',
      headerName: 'Action',
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
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      type: '',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
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
      hide: true,
    },
    {
      field: 'action',
      headerName: 'Action',
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
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      type: '',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
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
      hide: true,
    },
    {
      field: 'view',
      headerName: '',
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center' }}>
          <Button
            startIcon={<VisibilityIcon />}
            variant="outlined"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
            }}
            onClick={() => {
              viewHandler(params.row, 'CUSTOMER');
            }}
          >
            View
          </Button>
        </Grid>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
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
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      type: '',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
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
      hide: true,
    },
    {
      field: 'view',
      headerName: '',
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center' }}>
          <Button
            startIcon={<VisibilityIcon />}
            variant="outlined"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
            }}
            onClick={() => {
              viewHandler(params.row, 'SUPPLIER');
            }}
          >
            View
          </Button>
        </Grid>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
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
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      type: '',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
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
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Typography color="gray">
          {
            rowProductData.find(
              (product) => Number(product.id) === params.row.productId,
            )?.name
          }
        </Typography>
      ),
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
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      type: '',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const handleSave = () => {
    setOpenLoading(true);

    return fetchMutateData({
      productLogs: rowProductLogsData.filter((productLogs) =>
        selectedProductLogs.includes(productLogs.id),
      ),
      products: rowProductData.filter((product) =>
        selectedProducts.includes(product.id),
      ),
      customers: rowCustomerData.filter((customer) =>
        selectedCustomers.includes(customer.id),
      ),
      suppliers: rowSupplierData.filter((supplier) =>
        selectedSuppliers.includes(supplier.id),
      ),
      classifications: rowClassificationData.filter((classification) =>
        selectedClassifications.includes(classification.id),
      ),
      classificationOnProducts: queueCollection.classificationOnProducts,
    }).then((data) => {
      setOpenLoading(false);
      setResult(data);
      setOpenResultModal(true);
      closeHandler();
      setSelectedProducts([]);
      setSelectedProductLogs([]);
      setSelectedCustomers([]);
      setSelectedSuppliers([]);
      setSelectedClassifications([]);
    });
  };

  return (
    <div>
      <Dialog open={open} maxWidth="md">
        <DialogTitle fontWeight="bold">SYNC DATA</DialogTitle>
        <DialogContent>
          {rowProductData.length > 0 && (
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
                  checkboxSelection
                  selectionModel={selectedProducts}
                  onSelectionModelChange={(newSelection) =>
                    setSelectedProducts(newSelection)
                  }
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
                  rows={rowProductData}
                  columns={productColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Products Found' }}
                />
              </Box>
            </>
          )}
          {rowProductLogsData.length > 0 && (
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
                  checkboxSelection
                  selectionModel={selectedProductLogs}
                  onSelectionModelChange={(newSelection) =>
                    setSelectedProductLogs(newSelection)
                  }
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
                  rows={rowProductLogsData}
                  columns={productLogsColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Products Found' }}
                />
              </Box>
            </>
          )}
          {rowClassificationData.length > 0 && (
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
                  selectionModel={selectedClassifications}
                  onSelectionModelChange={(newSelection) =>
                    setSelectedClassifications(newSelection)
                  }
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
                  rows={rowClassificationData}
                  columns={classificationColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Classification Found' }}
                />
              </Box>
            </>
          )}
          {rowCustomerData.length > 0 && (
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
                  checkboxSelection
                  selectionModel={selectedCustomers}
                  onSelectionModelChange={(newSelection) =>
                    setSelectedCustomers(newSelection)
                  }
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
                  rows={rowCustomerData}
                  columns={customerColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  localeText={{ noRowsLabel: 'No Customers Found' }}
                />
              </Box>
            </>
          )}
          {rowSupplierData.length > 0 && (
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
                  checkboxSelection
                  selectionModel={selectedSuppliers}
                  onSelectionModelChange={(newSelection) =>
                    setSelectedSuppliers(newSelection)
                  }
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
                  rows={rowSupplierData}
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
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
        {openLoading && (
          <LoadingBackdrop
            isOpen={openLoading}
            closeHandler={() => {
              setOpenLoading(false);
            }}
          />
        )}
      </Dialog>
      <ResultModal
        result={result}
        openModal={openResultModal}
        closeHandler={() => setOpenResultModal(false)}
      />
      {openProductDetails && ( // addresses issue #37
        <ViewProductDetails
          product={rowProduct}
          classifications={rowClassifications}
          closeHandler={() => {
            setOpenProductDetails(false);
          }}
          isOpen={openProductDetails}
        />
      )}
      {openCustomerDetails && (
        <ViewCustomerDetails
          customer={rowCustomer}
          closeHandler={() => {
            setOpenCustomerDetails(false);
          }}
          isOpen={openCustomerDetails}
        />
      )}
      {openSupplierDetails && (
        <ViewSupplierDetails
          supplier={rowSupplier}
          closeHandler={() => {
            setOpenSupplierDetails(false);
          }}
          isOpen={openSupplierDetails}
        />
      )}
    </div>
  );
}
