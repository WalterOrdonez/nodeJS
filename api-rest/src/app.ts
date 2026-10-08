import cors from "cors";
import express from "express";
import type { Router } from "express";
import { errorHandler } from "./shared/http/errorHandler";
import { notFound } from "./shared/http/notFound";

export function createApp(creditCardRoutes: Router) {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/", (_req, res) => {
        res.json({ message: "API REST funcionando" });
    });

    app.use("/api/v1/credit-cards", creditCardRoutes);

    app.use(notFound);
    app.use(errorHandler);

    return app;
}
