import express from "express";
import { body } from "express-validator";
import {
  admin,
  crear,
  guardar,
  activar,
  editar,
  guardarCambios,
  eliminar
} from "../controllers/tareasController.js";
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

router.get("/mis-tareas", protegerRuta, admin);
router.get("/tareas/crear", protegerRuta, crear);
router.post(
  "/tareas/crear",
  protegerRuta,
  body("titulo").notEmpty().withMessage("El titulo del la Tarea es obligatorio").isLength({ max: 20 }).withMessage("El Titulo es demasiado largo"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion del la Tarea es obligatorio")
    .isLength({ max: 500 })
    .withMessage("La descripcion es demasiado larga"),
  body("importancia").isNumeric().withMessage("Selecciona nivel de Importancia"),
  body("estimacion")
    .isNumeric()
    .withMessage("Selecciona un estimacion"),
  guardar
);
router.get('/tareas/editar/:id', protegerRuta,editar)
router.post(
  '/tareas/editar/:id',
  protegerRuta,
  body("titulo").notEmpty().withMessage("El titulo del la Tarea es obligatorio").isLength({ max: 20 }).withMessage("El Titulo es demasiado largo"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion del la Tarea es obligatorio")
    .isLength({ max: 500 })
    .withMessage("La descripcion es demasiado larga"),
  body("importancia").isNumeric().withMessage("Selecciona nivel de Importancia"),
  body("estimacion")
    .isNumeric()
    .withMessage("Selecciona un estimacion"),
  guardarCambios
);
router.post("/tareas/activar/:id",
protegerRuta,
activar
)
router.post("/tareas/eliminar/:id",
protegerRuta,
eliminar
)

export default router;
