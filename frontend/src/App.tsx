import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductLog from './pages/ProductLogs';
import UserActions from './pages/UserActions';
import Login from './login/login';
import { verifyToken } from './login/loginFunctions';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import { errorAlert } from './functions/swalFunctions';
import fetchPsqlToRxdb, { insertToRxdb } from './rxdb/fetchData';
import SyncModal from './components/SyncModal';
import {
  QueueCollectionData,
  getAllQueueCollections,
} from './rxdb/fetchMutation';
import { destroyRxdb } from './rxdb/crudTools';
import { StatusNotification } from './functions/toastFunctions';
import NotificationContainer from './components/NotificationContainer';

const defaultSyncData = {
  products: [],
  customers: [],
  suppliers: [],
  productLogs: [],
  classifications: [],
  classificationOnProducts: [],
};

const hasQueueItems = (queueData: QueueCollectionData) =>
  Object.values(queueData)
    .map((e) => e.length)
    .some((length) => length > 0);

function App() {
  const [openSync, setOpenSync] = useState(false);
  const [syncData, setSyncData] =
    useState<QueueCollectionData>(defaultSyncData);
  const [online, setOnline] = useState(false);

  const socket = io(import.meta.env.VITE_BACKEND_URL);
  const location = useLocation();
  const navigate = useNavigate();

  const onConnect = () =>
    socket.on('connect', () => {
      console.log('connected');
      if (location.pathname !== '/') {
        return verifyToken()
          .then(async (result: any) => {
            if (!result.success) {
              return navigate('/');
            }
            if (!online) {
              console.log('fetch');

              await getAllQueueCollections().then((queueCollection) => {
                if (
                  queueCollection.customers.length > 0 ||
                  queueCollection.suppliers.length > 0 ||
                  queueCollection.products.length > 0 ||
                  queueCollection.productLogs.length > 0
                ) {
                  setOpenSync(true);
                  setSyncData(queueCollection);
                  navigate(location.pathname);
                }
              });

              return fetchPsqlToRxdb().then((data) => insertToRxdb(data));
            }

            return result;
          })
          .catch((error) => {
            if (error instanceof Error) {
              return errorAlert(error.message);
            }
            return errorAlert('Unexpected Error');
          })
          .then(() => setOnline(true));
      }
      if (document.cookie) {
        return navigate('/dashboard');
      }
      return false;
    });

  const onDisconnect = () => socket.on('disconnect', () => setOnline(false));

  useEffect(() => {
    onConnect();
    onDisconnect();

    socket.on('connect_error', () => {
      socket.connect();
    });

    socket.on('update', () => {
      console.log('UPDATING!!!!', online);
      getAllQueueCollections().then((queueCollection) => {
        if (
          queueCollection.customers.length > 0 ||
          queueCollection.suppliers.length > 0 ||
          queueCollection.products.length > 0 ||
          queueCollection.productLogs.length > 0
        ) {
          setOpenSync(true);
          setSyncData(queueCollection);
        } else {
          destroyRxdb().then(() =>
            fetchPsqlToRxdb().then((data) => insertToRxdb(data)),
          );
        }
        navigate(location.pathname);
      });
    });
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              openSyncModal={() =>
                getAllQueueCollections().then((queueCollection) => {
                  if (queueCollection && hasQueueItems(queueCollection)) {
                    setSyncData(queueCollection);
                    return setOpenSync(true);
                  }
                  return errorAlert('Nothing to be sync right now');
                })
              }
            />
          }
        />
        <Route path="/products" element={<Products socket={socket} />} />
        <Route path="/customers" element={<Customers socket={socket} />} />
        <Route path="/suppliers" element={<Suppliers socket={socket} />} />
        <Route path="/product-logs" element={<ProductLog />} />
        <Route path="/user-actions" element={<UserActions socket={socket} />} />
        <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
      <SyncModal
        open={openSync}
        closeHandler={() => setOpenSync(false)}
        queueCollection={syncData}
      />
      <StatusNotification online={online} />
      <NotificationContainer />
    </div>
  );
}

export default App;
