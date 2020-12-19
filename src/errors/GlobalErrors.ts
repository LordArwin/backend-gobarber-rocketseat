
import express, { NextFunction, Request, Response } from 'express';
export default function GlobalErrors (err: Error, request: Request, response: Response, _: NextFunction):any => {
  if (err instanceof AppError) {
    return response.status(400).json({
      status: 'error',
      msg: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    msg: 'Internal Server Error',
  });
}
