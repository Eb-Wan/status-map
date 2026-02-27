import { z } from "zod";

export const validateRegister = (req, res, next) => {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    });
    try {
        schema.parse(req.body);
        if (req.body.password !== req.body.confirmPassword) {
            return res
            .status(400)
            .json({ message: `Les mots de passe ne correspondent pas ` });
        }

        next();
    } catch (e) {
        return res.status(400).json({ message: e.issues.map( err => err.message).join(", ") });
    }
};

export const validateLogin = (req, res, next) => {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(6),
    });

    try {
        schema.parse(req.body);

        next();
    } catch (error) {
        return res
        .status(400)
        .json({ message: error.issues.map((err) => err.message).join(", ") });
    }
};


export const validateResetPasswordRequest = (req, res, next) => {
    const schema = z.object({
        email: z.email("L'adresse email n'est pas valide"),

    });

    try {
        schema.parse(req.body);

        next();
    } catch (error) {
        return res
        .status(400)
        .json({ message: error.issues.map((err) => err.message).join(", ") });
    }
};

export const validateGeoGet = (req, res, next) => {
    const schema = z.object({
        pos: z.object({
            lat: z.number().min(-90).max(90),
            long: z.number().min(-90).max(90),
            rad: z.number().min(5).max(1000)
        })
    });

    try {
        schema.parse(req.params);
        next();
    } catch (error) {
        return res
        .status(400)
        .json({ message: error.issues.map((err) => err.message).join(", ") });
    }
};

export const validateGeoPos = (req, res, next) => {
    const schema = z.object({
        pos: z.object({
            lat: z.number().min(-90).max(90),
            long: z.number().min(-90).max(90)
        })
    });

    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res
        .status(400)
        .json({ message: error.issues.map((err) => err.message).join(", ") });
    }
};

