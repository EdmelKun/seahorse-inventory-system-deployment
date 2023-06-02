import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton } from '@mui/material';
import { deleteSuccessAlert, errorAlert } from '../functions/swalFunctions';
import { deleteUser } from '../functions/userActionFunctions';
import { UserProps } from '../props/userProps';

export default function DeleteUser({ closeHandler, isOpen, user }: UserProps) {
  const [masterKey, setMasterKey] = useState('');
  const [showMasterKey, setShowMasterKey] = useState(false);

  const handleDelete = async () => {
    const action = 'DELETE';
    const data = {
      userId: user.id,
    };

    deleteUser(masterKey.trim(), action, data)
      .then((result) => {
        if (result) {
          deleteSuccessAlert();
        }
      })
      .then(closeHandler)
      .catch((error) => {
        let errorMessage = 'Unexpected Error';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        errorAlert(errorMessage);
      });

    closeHandler();
  };

  const toggleMasterKeyVisibility = () => {
    setShowMasterKey(!showMasterKey);
  };

  const handleMasterKeyChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMasterKey(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs" // Set maxWidth to "xs"
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          DELETE USER
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={10}>
              <TextField
                fullWidth
                margin="dense"
                id="masterKey"
                label="Master Key"
                type={showMasterKey ? 'text' : 'password'}
                variant="outlined"
                size="small"
                value={masterKey}
                onChange={handleMasterKeyChange}
                sx={{ marginBottom: 1 }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={toggleMasterKeyVisibility} edge="end">
                      {showMasterKey ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <DialogContentText
                id="alert-dialog-description"
                sx={{
                  textAlign: 'center',
                  fontSize: '1.4rem',
                }}
              >
                Are you sure that you want to delete the user:
              </DialogContentText>
            </Grid>
            <Grid item xs={10}>
              <DialogContentText
                id="alert-dialog-username"
                sx={{
                  textAlign: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                }}
              >
                {user.username}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container sx={{ justifyContent: 'center', gap: 5, mb: 3 }}>
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
              NO
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
              onClick={handleDelete}
            >
              YES
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
