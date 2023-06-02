import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ClassificationDocType as Classification } from '../types/classification';
import { ClassificationProps } from '../props/classificationProps';
import AddClassification from '../forms/AddClassification';
import EditClassification from '../forms/EditClassification';
import DeleteClassification from '../forms/DeleteClassification';
import selectAllData, { findDataById } from '../rxdb/selectTools';
import { errorAlert } from '../functions/swalFunctions';

export default function ClassificationModal({
  closeHandler,
  isOpen,
}: ClassificationProps) {
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [rowData, setRowData] = useState([
    {
      id: '',
      name: '',
    } as Classification,
  ]);

  const [rowClassification, setRowClassification] = useState(
    {} as Classification,
  );

  const rows = rowData;

  const editClassHandler = async (event: any) => {
    findDataById(Number(event.id), 'CLASSIFICATION')
      .then((result) => {
        setRowClassification(result as Classification);
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

  const deleteClassHandler = async (event: any) => {
    findDataById(Number(event.id), 'CLASSIFICATION')
      .then((result) => {
        setRowClassification(result as Classification);
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

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Classification Name', flex: 1 },
    {
      field: 'buttons',
      headerName: '',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => (
        <Grid container sx={{ justifyContent: 'center', gap: 2 }}>
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
            onClick={() => {
              editClassHandler(params);
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
            }}
            onClick={() => {
              deleteClassHandler(params);
            }}
          >
            Delete
          </Button>
        </Grid>
      ),
    },
  ];

  const displayData = async () =>
    selectAllData('CLASSIFICATION').then((result) =>
      setRowData(result as Classification[]),
    );

  React.useEffect(() => {
    displayData();
  }, [openAdd, openDetails, openDelete]);

  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="md" fullWidth>
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          <Grid item>
            <DialogTitle fontWeight="bold">CLASSIFICATIONS</DialogTitle>
          </Grid>
          <Grid
            item
            sx={{
              mt: 2,
              mr: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                ':hover': {
                  backgroundColor: 'rgb(4, 65, 249);',
                  color: 'white',
                  boxShadow: 7,
                },
              }}
              onClick={() => setOpenAdd(!openAdd)}
            >
              Add Classification
            </Button>
          </Grid>
        </Grid>

        <DialogContent>
          <Grid
            container
            sx={{
              gap: 2,
              marginBottom: 1,
            }}
          >
            <DataGrid
              sx={{
                height: '50vh',
                width: '50vw',
                justifyContent: 'flex-start',
                ':hover': { backgroundColor: 'transparent' },
              }}
              disableColumnMenu
              hideFooterSelectedRowCount
              disableSelectionOnClick
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[10]}
              pageSize={10}
            />
          </Grid>
          {openAdd && (
            <AddClassification
              closeHandler={() => setOpenAdd(false)}
              isOpen={openAdd}
            />
          )}

          {openDetails && (
            <EditClassification
              classification={rowClassification}
              closeHandler={() => {
                setOpenDetails(false);
              }}
              isOpen={openDetails}
            />
          )}

          {openDelete && (
            <DeleteClassification
              classification={rowClassification}
              closeHandler={() => {
                setOpenDelete(false);
              }}
              isOpen={openDelete}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ marginBottom: 3, paddingRight: 3 }}>
          <Button
            variant="contained"
            sx={{
              ':hover': {
                backgroundColor: 'rgb(4, 65, 249);',
                color: 'white',
                boxShadow: 7,
              },
            }}
            onClick={closeHandler}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
