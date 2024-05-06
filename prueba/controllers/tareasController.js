const admin = (req, res) => {
  res.render("tareas/admin", {
    pagina: "Mis Tareas",
    barra: true,
  });
};
//Formulario para crear Nueva tarea
const crear = (req, res) => {
  res.render("tareas/crear", {
    pagina: "Crear Tarea",
    barra: true,
  });
};
export { admin, crear };
