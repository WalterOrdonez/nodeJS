import type { ObjectSchema } from "joi";
import type { RequestHandler } from "express";

type RequestPart = "body" | "params";

export const validateRequest =
    (schema: ObjectSchema, part: RequestPart = "body"): RequestHandler =>
    (req, res, next) => {
        const { error, value } = schema.validate(req[part], {
            abortEarly: false,
            convert: true,
        });

        if (error) {
            res.status(400).json({
                message: "Solicitud inválida",
                details: error.details.map(({ message, path }) => ({
                    field: path.join("."),
                    message,
                })),
            });
            return;
        }

        if (part === "body") {
            req.body = value;
        } else {
            req.params = value as typeof req.params;
        }

        next();
    };
