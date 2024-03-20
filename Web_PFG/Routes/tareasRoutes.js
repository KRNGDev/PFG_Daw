//Rutas para Tareas
import express from "express";
import { admin,crear } from "../controllers/tareasController.js";

const router = express.Router();

router.get("/mis-tareas", admin);
router.get("/tareas/crear", crear);

export default router;