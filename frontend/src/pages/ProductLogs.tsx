import React, { useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import { showAllDetailedProductLogs } from '../rxdb/selectTools';
import { DetailedProductLogs } from '../types/productLogs';
import responsiveStyles from '../functions/responsive';

const getColor = (prev: number, current: number) => {
  if (prev !== current) {
    return prev < current ? 'green' : 'red';
  }
  return 'gray';
};

export default function ProductLogs() {
  const styles = responsiveStyles();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // Added state for the search value
  const [filteredData, setFilteredData] = useState<DetailedProductLogs[]>([]); // Added state for filtered data
  const wholeNumberChecker = (price: number) => price % 1 === 0;

  const [rows, setRows] = useState([
    {
      id: '0',
      name: '',
      productId: 0,
      previousStoreStock: 0,
      previousWarehouseStock: 0,
      previousRetailPrice: 0,
      previousWholesalePrice: 0,
      updatedStoreStock: 0,
      updatedWarehouseStock: 0,
      updatedRetailPrice: 0,
      updatedWholesalePrice: 0,

      date: new Date(),
    },
  ] as DetailedProductLogs[]);

  const filterData = (searchInput: string, data: DetailedProductLogs[]) => {
    if (!searchInput) {
      setFilteredData(data);
    } else {
      const lowercasedValue = searchInput
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '');
      const filtered = data.filter((item) =>
        item.name.toLowerCase().replace(/\s+/g, '').includes(lowercasedValue),
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    showAllDetailedProductLogs().then((result) => {
      setRows(result);
      filterData(searchValue, result);
    });
  }, [searchValue]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product Name',
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
  ];

  const duplicateFilteredData = filteredData ? [...filteredData] : [];

  const localizedDateOnFilteredData = duplicateFilteredData.map((item) => {
    const date = new Date(item.date);
    return {
      ...item,
      date: date.toLocaleString(),
    };
  });

  const sortedByDate = localizedDateOnFilteredData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <Grid container sx={{ position: 'relative', overflow: 'hidden' }}>
      <NavBar isOpen={open} setIsOpen={setOpen} />

      <Grid
        style={{
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
              Product Logs
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ width: '100vw', my: 3 }} />
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'right',
            mb: 2,
            ml: styles.margLeft,
            width: '85vw',
          }}
        >
          <Grid item>
            <SearchBar
              placeholder="Search Logs"
              searchFunction={(searchInput: string) => {
                setSearchValue(searchInput.trim());
                filterData(searchInput.trim(), rows);
              }}
            />
          </Grid>
        </Grid>
        <DataGrid
          hideFooterSelectedRowCount
          disableSelectionOnClick
          sx={{
            height: '70vh',
            width: '85vw',
            justifyContent: 'flex-start',
            ml: styles.margLeft,
            '& .customHeader': {
              backgroundColor: '#1976d2',
              color: 'white',
              fontSize: 'larger',
              fontWeight: 'bold',
            },
            mb: 3,
          }}
          rows={sortedByDate} // Changed from rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
        />
      </Grid>
    </Grid>
  );
}
