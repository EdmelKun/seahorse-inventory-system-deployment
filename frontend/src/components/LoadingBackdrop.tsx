import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
  closeHandler: () => void;
  isOpen: boolean;
}

export default function LoadingBackdrop({
  isOpen,
  closeHandler,
}: LoadingProps) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
        onClick={closeHandler}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
