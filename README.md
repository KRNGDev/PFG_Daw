# PFG_Daw
 Proyecto fin de grado de FP Daw. 

## Proyecto Plataforma de Gestion_Backlog.

 Para iniciar hay que escribir "npm run server" en una terminal y en otra "npm run dev" para activar el servidor y las funciones de tailwind respectivamente


### Guia de uso de cada carpeta del proyecto

    docs/                     # Documentación del proyecto

        requirements/         # Requisitos del sistema

        design/               # Diseño de la plataforma

        user_manual/          # Manual de usuario

    config/                   # Configuración de datos del la pagina como entrada a la base de datos

    controllers/              # Controladores de la lógica de negocio

    Helpers/                  # Scripts y archivos para La autentificacion con tokens y conexion 
                                para envio de emails de confirmacion

    public/                   # Carpeta con los archivos publicos

        css/                  # Archivos de estilo con Tailwind

        img/                  # Imagenes de archivo

        js/                   # Scripts js publicos

    models/                   # Modelos de datos

    routes/                   # Rutas de la API

    src/                      # Código fuente del proyecto



    views/                   # Carpeta con los archivos vista de la pagina

        auth/                # Archivos .pug para el inicio de sesion

        layout/              # Archivos .pug principales para el estilo de la pagina

        tareas/              # Archivos .pug para las paginas de cracion de tareas

        templates/           # Archivos .pug para la pagian del envio de mensajes email

    .env/                    # Archivos para el ocultamiento de credenciales importantes

