import React, { useEffect, useState } from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NavBar from '../components/NavBar';
import { ProductDocType as Product } from '../types/product';
import selectAllData, {
  showAllDetailedProductLogs,
  findDataById,
  showClassificationOnProduct,
} from '../rxdb/selectTools';
import DashboardGraph from '../components/Graph';
import { DetailedProductLogs as ProductLogs } from '../types/productLogs';
import { ClassificationDocType as Classification } from '../types/classification';
import { errorAlert } from '../functions/swalFunctions';
import ViewProductDetails from '../forms/ViewProductDetails';
import responsiveStyles from '../functions/responsive';

interface DashboardProps {
  openSyncModal: () => void;
}

export default function Dashboard({ openSyncModal }: DashboardProps) {
  const styles = responsiveStyles();
  const [open, setOpen] = useState(false);
  const [productStocks, setProductStocks] = useState<Product[]>([]);
  const [productOverallStocks, setProductOverallStocks] = useState<
    ProductLogs[]
  >([]);
  const [rowProduct, setRowProduct] = useState({} as Product);
  const [rowClassifications, setRowClassifications] = useState<
    Classification[]
  >([]);
  const [openDetails, setOpenDetails] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const viewHandler = async (event: any) =>
    findDataById(event.id, 'PRODUCT')
      .then((result) => setRowProduct(result! as Product))
      .then(() => showClassificationOnProduct(Number(event.id)))
      .then((e) => {
        if (e) {
          setRowClassifications(e);
        }
      })
      .then(() => setOpenDetails(!openDetails))
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });

  const totality = productStocks.map((element) => {
    const totalStocks = element.storeStock + element.warehouseStock;
    return { ...element, totalStocks };
  });

  const lowProductStocks = totality.filter(
    (product) => product.totalStocks <= product.lowstockAlert,
  );

  const ascendedSorting = lowProductStocks
    ? lowProductStocks.sort((a, b) => a.totalStocks - b.totalStocks)
    : [];

  const duplicateProductOverallStocks = productOverallStocks
    ? [...productOverallStocks]
    : [];

  const localizedDateOnProductOverallStocks = duplicateProductOverallStocks.map(
    (item) => {
      const date = new Date(item.date);
      return {
        ...item,
        date: dayjs(date),
      };
    },
  );

  const filterByDate = localizedDateOnProductOverallStocks.filter(
    (productLog) =>
      productLog.date.format('MM/DD/YYYY') ===
      selectedDate?.format('MM/DD/YYYY'),
  );

  const stockChanges = filterByDate.map((element) => {
    const totalPreviousStocks =
      Number(element.previousStoreStock) +
      Number(element.previousWarehouseStock);
    const totalUpdatedStocks =
      Number(element.updatedStoreStock) + Number(element.updatedWarehouseStock);

    const overallSoldStocks = totalUpdatedStocks - totalPreviousStocks;
    return {
      ...element,
      totalPreviousStocks,
      totalUpdatedStocks,
      overallSoldStocks,
    };
  });

  const uniqueProducts: any = {};

  stockChanges.forEach((product) => {
    const productName = product.name;

    if (uniqueProducts[productName]) {
      uniqueProducts[productName].overallSoldStocks +=
        product.overallSoldStocks;
    } else {
      uniqueProducts[productName] = { ...product };
    }
  });
  const mergedProducts = Object.values(uniqueProducts);

  const sortedProducts = (mergedProducts as any[]).sort(
    (a, b) => a.overallSoldStocks - b.overallSoldStocks,
  );

  const lowStockRows = ascendedSorting;
  const lowStockColumns: GridColDef[] = [
    {
      field: 'view',
      headerName: '',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center' }}>
          <Button
            startIcon={<VisibilityIcon sx={{ padding: styles.iconPadding }} />}
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
              fontSize: styles.textSize,
              padding: styles.paddingSize,
            }}
            onClick={() => {
              viewHandler(params.row);
            }}
          >
            View
          </Button>
        </Grid>
      ),
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
      field: 'lowstockAlert',
      headerName: 'Low Stock Alert',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'storeStock',
      headerName: 'Store Stock',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'warehouseStock',
      headerName: 'Warehouse Stock',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'totalStocks',
      headerName: 'Total Stocks',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
  ];

  useEffect(() => {
    selectAllData('PRODUCT')
      .then((result) => {
        setProductStocks(result as Product[]);
      })
      .then(() => {
        showAllDetailedProductLogs().then((result) => {
          setProductOverallStocks(result as ProductLogs[]);
        });
      });
  }, []);

  return (
    <Grid container sx={{ position: 'relative', overflowX: 'hidden' }}>
      <NavBar isOpen={open} setIsOpen={setOpen} />
      <Grid
        sx={{
          height: '100%',
          width: '85%',
          marginLeft: styles.wholePageMarginLeft(open),
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            ml: styles.margLeft,
            mt: 4,
          }}
        >
          <Grid item>
            <Typography fontFamily="Poppins" fontSize={25}>
              Dashboard
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              sx={{
                ':hover': {
                  backgroundColor: 'rgb(4, 65, 249)',
                  color: 'white',
                  boxShadow: 6,
                },
                boxShadow: 3,
                borderRadius: 5,
              }}
              onClick={openSyncModal}
            >
              Sync Data
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ width: '100vw', my: 3 }} />

        <Grid
          container
          sx={{
            height: '50vh',
            width: '100%',
            ml: styles.margLeft,
            mb: 10,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date to View Stock Changes"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{ mb: 3 }}
            />
          </LocalizationProvider>

          <DashboardGraph data={sortedProducts} dateSelected={selectedDate} />
        </Grid>

        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            ml: styles.margLeft,
          }}
        >
          <Grid item>
            <Typography fontFamily="Poppins" fontSize={25}>
              Stock Alert
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ width: '100vw', my: 3 }} />
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            ml: styles.margLeft,
            pb: 5,
          }}
        >
          <DataGrid
            hideFooterSelectedRowCount
            disableSelectionOnClick
            sx={{
              ':hover': { backgroundColor: 'transparent' },
              height: '70vh',
              width: '85vw',
              justifyContent: 'flex-start',
              '& .customHeader': {
                backgroundColor: '#1976d2',
                color: 'white',
                fontSize: 'larger',
                fontWeight: 'bold',
              },
            }}
            rows={lowStockRows}
            columns={lowStockColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            localeText={{ noRowsLabel: 'No Products are in low stock' }}
          />
        </Grid>
        {openDetails && ( // addresses issue #37
          <ViewProductDetails
            product={rowProduct}
            classifications={rowClassifications}
            closeHandler={() => {
              setOpenDetails(false);
            }}
            isOpen={openDetails}
          />
        )}
      </Grid>
    </Grid>
  );
}
