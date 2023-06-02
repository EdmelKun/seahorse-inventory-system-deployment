import React, { useState, useEffect } from 'react';
import { Divider, Typography, Grid, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import AddCustomer from '../forms/AddCustomer';
import { CustomerDocType as Customer } from '../types/customer';
import selectAllData, { findDataById } from '../rxdb/selectTools';
import { CustomerSocket } from '../props/customerProps';
import { errorAlert, nonAdminAlert } from '../functions/swalFunctions';
import EditCustomerDetails from '../forms/EditCustomerDetails';
import ViewCustomerDetails from '../forms/ViewCustomerDetails';
import DeleteCustomer from '../forms/DeleteCustomer';
import responsiveStyles from '../functions/responsive';

export default function Customers({ socket }: CustomerSocket) {
  const styles = responsiveStyles();
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // New state for the search value
  const [filteredData, setFilteredData] = useState<Customer[]>([]); // New state for filtered data
  const [openViewDetails, setOpenViewDetails] = useState(false);

  const [rowData, setRowData] = useState([
    {
      id: '0',
      firstName: '',
      lastName: '',
      sex: 'MALE',
      contactNum: '',
      emailAddress: '',
      country: '',
      province: '',
      municipality: '',
      street: '',
      zipCode: 0,
    } as Customer,
  ]);

  const [rowCustomer, setRowCustomer] = useState({} as Customer);

  const editHandler = async (event: any) => {
    findDataById(Number(event.id), 'CUSTOMER')
      .then((result) => {
        setRowCustomer(result as Customer);
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
    findDataById(Number(event.id), 'CUSTOMER')
      .then((result) => {
        setRowCustomer(result as Customer);
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
    findDataById(Number(event.id), 'CUSTOMER')
      .then((result) => {
        setRowCustomer(result as Customer);
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

  const isAdmin = localStorage.getItem('admin') === 'true';

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
  ];

  const adminColumns: GridColDef[] = [
    {
      field: 'buttons',
      headerName: '',
      flex: 1.5,
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

  const filterData = (searchInput: string, data: Customer[]) => {
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
          item.firstName
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue) ||
          item.lastName
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lowercasedValue),
      );
      setFilteredData(filtered);
    }
  };

  const displayData = async () =>
    selectAllData('CUSTOMER').then((result) => {
      const customers = result as Customer[];
      setRowData(customers);
      filterData(searchValue, customers); // Call filterData when data changes
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
              Customers
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
                Add Customer
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
              placeholder="Search Customers"
              searchFunction={(searchInput: string) => {
                // Modified Search Bar Component
                setSearchValue(searchInput.trim()); // Trim searchInput here too
                filterData(searchInput.trim(), rowData);
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
          localeText={{ noRowsLabel: 'No Customers Found' }}
        />
        {openAdd && (
          <AddCustomer
            customer={rowCustomer}
            closeHandler={() => {
              setOpenAdd(false);
            }}
            isOpen={openAdd}
          />
        )}
        {openDetails && (
          <EditCustomerDetails
            customer={rowCustomer}
            closeHandler={() => {
              setOpenDetails(false);
            }}
            isOpen={openDetails}
          />
        )}
        {openViewDetails && (
          <ViewCustomerDetails
            customer={rowCustomer}
            closeHandler={() => {
              setOpenViewDetails(false);
            }}
            isOpen={openViewDetails}
          />
        )}
        {openDelete && (
          <DeleteCustomer
            customer={rowCustomer}
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
