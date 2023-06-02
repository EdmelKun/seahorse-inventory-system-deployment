import React, { useState } from 'react';
import { Divider, Typography, Grid, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import {
  errorAlert,
  nonAdminAlert,
  nonMasterRedirectAlert,
} from '../functions/swalFunctions';
import { UserDocType as User } from '../types/user';
import { getAllUsers, getById } from '../functions/userActionFunctions';
import AddUser from '../forms/AddUser';
import EditUser from '../forms/EditUser';
import DeleteUser from '../forms/DeleteUser';
import { UserSocket } from '../props/userProps';
import responsiveStyles from '../functions/responsive';

export default function UserActions({ socket }: UserSocket) {
  const styles = responsiveStyles();
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rowUser, setRowUser] = useState({} as User);
  const [searchValue, setSearchValue] = useState(''); // New state for the search value
  const [filteredData, setFilteredData] = useState<User[]>([]); // New state for filtered data

  const navigate = useNavigate();

  const editHandler = async (event: any) => {
    getById(event.id)
      .then((result) => {
        const { admin, ...newData } = result.data;
        newData.admin = admin ? 'YES' : 'NO';

        setRowUser(newData);
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

  const deleteHandler = async (event: any) => {
    getById(event.id)
      .then((result) => {
        const { admin, ...newData } = result.data;
        newData.admin = admin ? 'YES' : 'NO';

        setRowUser(newData);
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

  const filterData = (searchInput: string, data: User[]) => {
    // New Function
    if (!searchInput) {
      setFilteredData(data);
    } else {
      const lowercasedValue = searchInput
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '');
      const filtered = data.filter((item) =>
        item.username
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(lowercasedValue),
      );
      setFilteredData(filtered);
    }
  };

  const [rowData, setRowData] = useState([
    {
      id: 0,
      username: '',
      admin: '',
    } as User,
  ]);

  // const rows = rowData;

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'admin',
      headerName: 'Permission Type',
      flex: 1,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      align: 'center',
    },
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
            onClick={() => editHandler(params)}
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
            onClick={() => deleteHandler(params)}
          >
            Delete
          </Button>
        </Grid>
      ),
    },
  ];

  const displayData = async () =>
    getAllUsers()
      .then((result) => {
        const userArray = result.data.map((user: { admin: any }) => ({
          ...user,
          admin: user.admin ? 'YES' : 'NO',
        }));

        filterData(searchValue, userArray);
        return setRowData(userArray as User[]);
      })
      .catch(() => {
        nonMasterRedirectAlert(() => navigate('/dashboard'));
      });

  React.useEffect(() => {
    displayData();
  }, [openDetails, openDelete, searchValue]);

  socket
    .on('connect', () => displayData())
    .on('update', () => {
      console.log('zzz');
    });

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
              User Actions
            </Typography>
          </Grid>
          <Grid item>
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
              Add User
            </Button>
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
            {/* <SearchBar placeholder="Search Users" /> */}
            <SearchBar
              placeholder="Search Users"
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
          disableSelectionOnClick
          sx={{
            height: '70vh',
            width: '85vw',
            justifyContent: 'flex-start',
            ml: styles.margLeft,
            mb: 3,
            overflowX: 'auto', // for side scroller
            '& .customHeader': {
              backgroundColor: '#1976d2',
              color: 'white',
              fontSize: 'larger',
              fontWeight: 'bold',
            },
          }}
          rows={filteredData} // Use filtered data
          columns={columns}
          rowsPerPageOptions={[10]}
          pageSize={10}
          localeText={{ noRowsLabel: 'No Users Found' }}
        />
        {openAdd && (
          <AddUser
            closeHandler={() => {
              setOpenAdd(false);
              displayData();
            }}
            isOpen={openAdd}
          />
        )}
        {openDetails && (
          <EditUser
            user={rowUser}
            closeHandler={() => {
              setOpenDetails(false);
            }}
            isOpen={openDetails}
          />
        )}
        {openDelete && (
          <DeleteUser
            user={rowUser}
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
