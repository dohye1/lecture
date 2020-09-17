import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import userRouter from './routers/userRouter';
import classRouter from './routers/classRouter';
import scoreRouter from './routers/scoreRouter';
import "./db";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes.apiUser, userRouter);
app.use(routes.apiClass, classRouter);
app.use(routes.apiScore, scoreRouter);

app.listen(PORT, () => { console.log(`Listening on PORT : ${PORT}`) })