//Usamos Sequelize para el manejo de la base de datos sin usar lenguaje SQL
import { DataTypes, Sequelize } from "sequelize";
// usamos la API bcrypt para el encriptado de la clave
import bcrypt from "bcrypt";
import db from "../Config/db.js";

//Crea en la base de datos la tabla Usuario 
const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
  }
);

//Metodos personalizados para el encriptado de la clave

Usuario.prototype.verificarPassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

export default Usuario;
