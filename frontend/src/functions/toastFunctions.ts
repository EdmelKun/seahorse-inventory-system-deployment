import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function StatusNotification({ online }: any) {
  useEffect(() => {
    if (online) {
      toast.success('Online!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      toast.error('Offline!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [online]);

  return null;
}

export function SuccessNotification({ success, table, action }: any) {
  useEffect(() => {
    if (success) {
      toast.success(`${table} ${action} Successfully`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [success]);

  return null;
}

export function ErrorNotification({ error, message }: any) {
  useEffect(() => {
    if (error) {
      toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [error]);

  return null;
}
