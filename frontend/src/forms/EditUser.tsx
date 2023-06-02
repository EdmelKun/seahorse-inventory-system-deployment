import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserProps } from '../props/userProps';
import { editSuccessAlert, errorAlert } from '../functions/swalFunctions';
import userFormikSchema from '../formikSchema/userFormikSchema';
import { editUser } from '../functions/userActionFunctions';

export default function EditUser({ closeHandler, isOpen, user }: UserProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMasterKey, setShowMasterKey] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      masterKey: '',
      admin: user.admin,
    },
    validationSchema: userFormikSchema,
    onSubmit: async () => {
      const action = 'UPDATE';
      const data = {
        id: user.id,
        username: values.username.trim(),
        password: values.password.trim(),
        // eslint-disable-next-line no-unneeded-ternary
        admin: values.admin === 'YES' ? true : false,
      };
      editUser(values.masterKey.trim(), action, data)
        .then(() => {
          editSuccessAlert();
        })
        .then(closeHandler)
        .catch((error) => {
          let errorMessage = 'Unexpected Error';
          if (error.message === 'P2002') {
            errorMessage = 'A USER WITH THAT USERNAME ALREADY EXISTS';
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          errorAlert(errorMessage);
        });
      closeHandler();
    },
  });

  const usernameError = !!(errors.username && touched.username);
  const passwordError = !!(errors.password && touched.password);
  const confirmPasswordError = !!(
    errors.confirmPassword && touched.confirmPassword
  );
  const masterKeyError = !!(errors.masterKey && touched.masterKey);
  const adminError = !!(errors.admin && touched.admin);

  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler} maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          EDIT USER
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
                value={values.masterKey}
                onChange={handleChange}
                error={masterKeyError}
                helperText={masterKeyError && errors.masterKey}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowMasterKey(!showMasterKey)}
                        edge="end"
                      >
                        {showMasterKey ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                margin="dense"
                id="username"
                label="Username"
                type="text"
                variant="outlined"
                size="small"
                value={values.username}
                onChange={handleChange}
                error={usernameError}
                helperText={usernameError && errors.username}
              />
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth error={adminError} size="small">
                <InputLabel id="admin">Admin</InputLabel>
                <Select
                  name="admin"
                  labelId="admin"
                  id="admin"
                  value={values.admin || ''}
                  label="Admin"
                  onChange={handleChange}
                >
                  <MenuItem value="YES">YES</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </Select>
                {adminError && <FormHelperText>{errors.admin}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                margin="dense"
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                size="small"
                value={values.password}
                onChange={handleChange}
                error={passwordError}
                helperText={passwordError && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                margin="dense"
                id="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                size="small"
                value={values.confirmPassword}
                onChange={handleChange}
                error={confirmPasswordError}
                helperText={confirmPasswordError && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container sx={{ justifyContent: 'center', gap: 5, mb: 3 }}>
            <Button variant="contained" color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Save
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
