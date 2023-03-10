import express from 'express';
import RouterApp from './router/routerApp';
import config from '../config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import '../config'

const app = express();
const { PORT, BASE }  = config;

app.use( express.json() );

app.use(cors({
      origin: 'http://localhost:3000'
}))

app.use(cookieParser());
app.set('trust proxy', true);

app.get('/', (req, res) => res.send("*********** SERVER STARTED **************"));
app.use(BASE, new RouterApp().start());

const server = app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

server.on('error',() => console.log('Ocurrio un error en el servidor'));

