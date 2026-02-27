import express from "express";
import { validateGeoPos, validateGeoGet } from "../middleware/validation.middleware.js";
import { getGeo, postGeo } from "../controllers/geo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:lat/:long/:rad", authMiddleware, validateGeoGet, getGeo);
router.post("/", authMiddleware, validateGeoPos, postGeo);

export default router;
