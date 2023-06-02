/* eslint-disable no-console */
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import login from './routers/users';
import products from './routers/products';
import userActions from './routers/userActions';
import data from './routers/data';

const app = express();
const PORT = process.env.PORT ?? 4000;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  // console.log(
  //   'a user connected',
  //   socket.id,
  //   socket.handshake.auth,
  //   socket.data,
  // );
  socket.on('authenticate', (auth) => {
    console.log(auth, 'lllll', socket.handshake.auth);
  });
  // socket.emit('update', '')
});

app
  .use(
    cors({
      credentials: true,
    }),
  )
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .get('/ ', (req, res) => {
    res.send('TEST');
  })
  .use('/login', login)
  .use('/products', products)
  .use('/data', data(io))
  .use('/userActions', userActions);

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

export default app;
