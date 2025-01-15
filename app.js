const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const tasksRouter = require('./controllers/tasks')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('Conectando a', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Conectado a MongoDB')
  })
  .catch(error => {
    logger.error('Error al conectar con MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/tareas', tasksRouter)
app.use('/api/usuarios', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app