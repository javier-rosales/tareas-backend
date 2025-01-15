// Este archivo solo tuvo como propósito crear una configuración inicial de la base de datos MongoDB

const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  createdAt: String
})

const Task = mongoose.model('Task', taskSchema)

const task = new Task({
  title: 'tarea de prueba',
  description: 'descripcion de prueba',
  status: 'pendiente',
  createdAt: 'fecha'
})

task.save().then(result => {
  console.log('tarea guardada!')
  mongoose.connection.close()
})