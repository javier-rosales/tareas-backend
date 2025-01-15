# Creación de una API REST

## Instrucciones:
Crear una API REST para interactuar con la base de datos creada en la Parte 1. Debe desarrollarse en Node.js con Express.js.

## Requerimientos:
### Endpoints obligatorios:
- **POST /usuarios** - Registrar un nuevo usuario.
- **POST /tareas** - Crear una nueva tarea.
- **GET /tareas** - Obtener todas las tareas.
- **GET /tareas/:id** - Obtener una tarea específica.
- **PUT /tareas/:id** - Actualizar el estado de una tarea.
- **DELETE /tareas/:id** - Eliminar una tarea.

### Validaciones requeridas:
- El correo debe ser único.
- Las tareas deben estar asociadas a usuarios válidos.

## Documentación
Documentar la API usando Swagger o Postman.