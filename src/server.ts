/* eslint-disable no-console */
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import './database';
import UploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(UploadConfig.filepath));
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status_code).json({
      status: 'error',
      msg: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    msg: 'Internal Server Error',
  });
});
app.listen(3333, () => console.log('🤡 running in port 3333'));
