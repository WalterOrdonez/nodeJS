import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    console.error(error);
    const status = error instanceof AppError ? error.status : 500;
    const message =
        error instanceof Error ? error.message : "Error interno del servidor";
    res.status(status).json({ message });
};
