import Tarea from './Tarea.js'
import Usuario from './Usuarios.js'

Tarea.belongsTo(Usuario)

export{
    Tarea,
    Usuario
}