import { validationResult } from "express-validator";
import { Tarea } from "../models/index.js";

const admin = async (req, res) => {
  const { id } = req.usuario;
  const tareas = await Tarea.findAll({
    where: {
      usuarioId: id,
    },
  });

  res.render("tareas/admin", {
    pagina: "Mis tareas",
    tareas: tareas,
    csrfToken: req.csrfToken(),
  });
};

//Formulario para crear Nueva tarea
const crear = async (req, res) => {
  res.render("tareas/crear", {
    pagina: "Crear Tarea",
    csrfToken: req.csrfToken(),
    datos: {},
  });
};

const guardar = async (req, res) => {
  // Validacion
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {

    return res.render("tareas/crear", {
      pagina: "Crear Tarea",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Creamos un Registro

  const {
    titulo,
    descripcion,
    importancia,
    estimacion,
    wc,
  } = req.body;

  const { id: usuarioId } = req.usuario;
  try {
    const TareaGuardada = await Tarea.create({
      titulo,
      descripcion,
      usuarioId,
      importancia,
      estimacion,
      wc,
      publicado: 1,
    });

    res.redirect(`/mis-tareas`);
  } catch (error) {
    console.log(error);
  }
};

const activar = async (req, res) => {
  const { id } = req.params;

  // Validar Tarea
  const tarea = await Tarea.findByPk(id);

  if (!tarea) {
    return res.redirect("/mis-tareas");
  }

  // Validar que la Tarea no existe
  if (tarea.publicado) {
    return res.redirect("/mis-tareas");
  }

  // Validar que la Tarea pertenece a quien la visita
  if (req.usuario.id.toString() !== tarea.usuarioId.toString()) {
    return res.redirect("/mis-tareas");
  }

  try {
    if(tarea.publicado==1){
    tarea.publicado = 0;
    }else{
      tarea.publicado = 1;
    }

    await tarea.save();
    res.redirect("/mis-tareas");
  } catch (error) {
    console.log(error);
  }
};

const editar = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la tarea por su id
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      // Si no se encuentra la tarea, redireccionar
      return res.redirect("/mis-tareas");
    }

    // Verificar que la tarea pertenece al usuario actual
    if (req.usuario.id.toString() !== tarea.usuarioId.toString()) {
      // Si la tarea no pertenece al usuario, redireccionar
      return res.redirect("/mis-tareas");
    }

    res.render("tareas/editar", {
      pagina: `Editar ${tarea.titulo}`,
      csrfToken: req.csrfToken(),
      datos: tarea,
    });
  } catch (error) {
    console.log(error);
  }
};
const guardarCambios = async (req, res) => {
  // Verificar la validacion
 const { id } = req.params;
   // Validar que exista
  const tarea = await Tarea.findByPk(id);

  if (!tarea) {
    return res.redirect("/mis-tareas");
  }
  // REvisar quien visita es quien la creo
  if (tarea.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-tareas");
  }

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    res.render("tareas/editar", {
      pagina: `Editar ${tarea.titulo}`,
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Reescribir el objeto
  try {
    const {
      titulo,
      descripcion,
      importancia,
      estimacion,
      wc,
    } = req.body;

    tarea.set({
      titulo,
      descripcion,
      importancia,
      estimacion,
      wc,
    });

    await tarea.save();
    res.redirect("/mis-tareas");
  } catch (error) {
    console.log(error);
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar la tarea por su id
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      // Si no se encuentra la tarea, redireccionar
      return res.redirect("/mis-tareas");
    }

    // Verificar que la tarea pertenece al usuario actual
    if (req.usuario.id.toString() !== tarea.usuarioId.toString()) {
      // Si la tarea no pertenece al usuario, redireccionar
      return res.redirect("/mis-tareas");
    }

    // Eliminar la tarea
    await tarea.destroy();

    // Redireccionar a la página de tareas del usuario
    res.redirect("/mis-tareas");
  } catch (error) {
    console.log(error);
  }
};

export { admin, crear, guardar, activar, editar, guardarCambios, eliminar };
