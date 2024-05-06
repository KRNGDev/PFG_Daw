import express from "express";
//Se importan los distintos metodos que vamos creando
import {
  formularioLogin,
  autenticar,
  formularioOlvidePassword,
  registrar,
  confirmar,
  formularioRegistro,
  resetPassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuarioController.js";

//crea el router
const router = express.Router();

//las redireciones a distintas paginas usando el metodo get y post
router.get("/login", formularioLogin);
router.post("/login", autenticar);

router.get("/registro", formularioRegistro);
router.post("/registro", registrar);

router.get("/confirmar/:token", confirmar);

router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetPassword);

//Almacenar el nuevo password
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

export default router;
