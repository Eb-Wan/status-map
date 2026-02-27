import "dotenv/config";
import {
    setPos,
    findUsersByPos
} from "../models/user.model.js";

export const getGeo = async (req, res) => {
    try {
        const { lat, long, rad } = req.params;

        users = await findUsersByPos(lat, long, rad);
        res.status(200).json({ users, message: "Mot de passe renitialisé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "erreur serveur ", error: error.message });
    }
};

export const postGeo = async (req, res) => {
    try {
        const id = user.id;
        const { lat, long } = req.body.pos ?? {};

        await setPos(id, lat, long);
        res.status(200).json({ message: "Mot de passe renitialiser avec success" });
    } catch (error) {
        res.status(500).json({ message: "erreur serveur ", error: error.message });
    }
};