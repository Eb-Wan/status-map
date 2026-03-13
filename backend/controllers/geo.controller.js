import "dotenv/config";
import {
    setPos,
    findUsersByPos
} from "../models/user.model.js";

export const getGeo = async (req, res) => {
    try {
        const { lat, long, rad } = req.params;

        const users = await findUsersByPos(lat, long, rad);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "erreur serveur ", error: error.message });
    }
};

export const postGeo = async (req, res) => {
    try {
        const id = req.user.id;
        const { lat, long } = req.body ?? {};

        await setPos(id, lat, long);
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({ message: "erreur serveur ", error: error.message });
    }
};