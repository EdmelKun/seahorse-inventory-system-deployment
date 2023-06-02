import React, { useState, useEffect } from 'react';
import { Divider, Typography, Grid, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import AddSupplier from '../forms/AddSupplier';
import { SupplierDocType as Supplier } from '../types/supplier';
import selectAllData, { findDataById } from '../rxdb/selectTools';
import { errorAlert, nonAdminAlert } from '../functions/swalFunctions';
import EditSupplierDetails from '../forms/EditSupplierDetails';
import ViewSupplierDetails from '../forms/ViewSupplierDetails';
import { SupplierSocket } from '../props/supplierProps';
import DeleteSupplier from '../forms/DeleteSupplier';
import responsiveStyles from '../functions/responsive';

export default function Suppliers({ socket }: SupplierSocket) {
  const styles = responsiveStyles();
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // New state for the search value
  const [filteredData, setFilteredData] = useState<Supplier[]>([]); // New state for filtered data

  const [openViewDetails, setOpenViewDetails] = useState(false);

  const isAdmin = localStorage.getItem('admin') === 'true';

  const [rowSupplier, setRowSupplier] = useState({} as Supplier);
  const [rowData, setRowData] = useState([
    {
      id: '0',
      contactName: '',
      businessName: '',
      contactNum: '',
      emailAddress: '',
      country: '',
      province: '',
      municipality: '',
      street: '',
      zipCode: 0,
    } as Supplier,
  ]);

  // const rows = rowData;

  const editHandler = async (event: any) => {
    findDataById(Number(event.id), 'SUPPLIER')
      .then((result) => {
        setRowSupplier(result as Supplier);
      })
      .then(() => setOpenDetails(!openDetails))
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });
  };

  const viewHandler = async (event: any) => {
    findDataById(Number(event.id), 'SUPPLIER')
      .then((result) => {
        setRowSupplier(result as Supplier);
      })
      .then(() => setOpenViewDetails(!openViewDetails))
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });
  };

  const deleteHandler = async (event: any) => {
    findDataById(Number(event.id), 'SUPPLIER')
      .then((result) => {
        setRowSupplier(result as Supplier);
      })
      .then(() => setOpenDelete(!openDelete))
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });
  };

  const columns: GridColDef[] = [
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
  ];

  const adminColumns: GridColDef[] = [
    {
      field: 'buttons',
      headerName: '',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center', gap: styles.gapSize }}>
          <Button
            variant="contained"
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
              if (localStorage.getItem('admin') === 'true') {
                editHandler(params);
              } else {
                nonAdminAlert();
              }
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(249, 65, 4)',
                color: 'white',
                boxShadow: 6,
              },
              boxShadow: 3,
              borderRadius: 5,
              fontSize: styles.textSize,
              padding: styles.paddingSize,
            }}
            onClick={() => {
              if (localStorage.getItem('admin') === 'true') {
                deleteHandler(params);
              } else {
                nonAdminAlert();
              }
            }}
          >
            Delete
          </Button>
        </Grid>
      ),
    },
  ];

  const filterData = (searchInput: string, data: Supplier[]) => {
    // New Function
    if (!searchInput) {
      setFilteredData(data);
    } else {
      const lowercasedValue = searchInput
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '');
      const filtered = data.filter(
        (item) =>
          item.contactName
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue) ||
          item.businessName
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue),
      );
      setFilteredData(filtered);
    }
  };

  const displayData = async () =>
    selectAllData('SUPPLIER').then((result) => {
      const suppliers = result as Supplier[];
      setRowData(suppliers);
      filterData(searchValue, suppliers); // Call filterData when data changes
    });

  useEffect(() => {
    displayData();
  }, [openAdd, openDetails, openDelete, searchValue]); // Add searchValue to dependencies

  socket.on('connect', () => displayData()).on('update', () => {});

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
              Suppliers
            </Typography>
          </Grid>
          <Grid item>
            {isAdmin && (
              <Button
                variant="contained"
                sx={{
                  ':hover': {
                    backgroundColor: 'rgb(4, 65, 249);',
                    color: 'white',
                    boxShadow: 7,
                  },
                  boxShadow: 3,
                  borderRadius: 5,
                }}
                onClick={() => {
                  if (localStorage.getItem('admin') === 'true') {
                    setOpenAdd(!openAdd);
                  } else {
                    nonAdminAlert();
                  }
                }}
              >
                Add Supplier
              </Button>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ width: '100vw', my: 3 }} />
        <Grid
          container
          sx={{
            justifyContent: 'right',
            display: 'flex',
            ml: styles.margLeft,
            mt: 1,
            mb: 3,
          }}
        >
          <Grid item>
            <SearchBar
              placeholder="Search Suppliers"
              searchFunction={(searchInput: string) => {
                // Modified Search Bar Component
                setSearchValue(searchInput.trim()); // Trim searchInput here too
                filterData(searchInput, rowData);
              }}
            />
          </Grid>
        </Grid>
        <DataGrid
          hideFooterSelectedRowCount
          // disableSelectionOnClick
          sx={{
            height: '70vh',
            width: '85vw',
            justifyContent: 'flex-start',
            ml: styles.margLeft,
            mb: 3,
            '& .customHeader': {
              backgroundColor: '#1976d2',
              color: 'white',
              fontSize: 'larger',
              fontWeight: 'bold',
            },
          }}
          rows={filteredData} // Use filtered data
          columns={isAdmin ? [...columns, ...adminColumns] : columns}
          rowsPerPageOptions={[10]}
          pageSize={10}
          localeText={{ noRowsLabel: 'No Suppliers Found' }}
        />
        {openAdd && (
          <AddSupplier
            closeHandler={() => {
              setOpenAdd(false);
            }}
            isOpen={openAdd}
          />
        )}
        {openDetails && (
          <EditSupplierDetails
            supplier={rowSupplier}
            closeHandler={() => {
              setOpenDetails(false);
            }}
            isOpen={openDetails}
          />
        )}
        {openViewDetails && (
          <ViewSupplierDetails
            supplier={rowSupplier}
            closeHandler={() => {
              setOpenViewDetails(false);
            }}
            isOpen={openViewDetails}
          />
        )}
        {openDelete && (
          <DeleteSupplier
            supplier={rowSupplier}
            closeHandler={() => {
              setOpenDelete(false);
            }}
            isOpen={openDelete}
          />
        )}
      </Grid>
    </Grid>
  );
}
