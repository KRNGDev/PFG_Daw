
//Creamos tokens con la API jsonwebtoken, para autentificacion del usuario entrando en las paginas
import jwt from 'jsonwebtoken'

//Genera el Token
const generarJWT = datos => jwt.sign({id: datos.id, nombre: datos.nombre },process.env.JWT_SECRET,{ expiresIn: '1d' })

//Genera una id para autentificacion
const generarId = ()=>  Math.random().toString(32).substring(2) + Date.now().toString(32);



export{
    generarJWT,
    generarId    
}