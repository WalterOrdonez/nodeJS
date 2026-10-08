import type { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res) => {
    res.status(404).json({ message: `Ruta no encontrada: ${req.originalUrl}` });
};
