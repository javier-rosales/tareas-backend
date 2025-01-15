const express = require('express')
require('dotenv').config()
const Task = require('./models/task')
let users = require('./users')
let tasks = require('./tasks')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id con formato invalido' })
  } 

  next(error)
}

const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const generateId = table => {
  const maxId = table.length > 0
    ? Math.max(...table.map(n => Number(n.id)))
    : 0
  return maxId + 1
}

app.get('/api/tareas', (request, response) => {
  Task.find({}).then(tasks => {
    response.json(tasks)
  })
})

app.get('/api/tareas/:id', (request, response, next) => {
  Task.findById(request.params.id)
    .then(task => {
      if (task) {
        response.json(task)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/usuarios', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'data missing'
    })
  }

  const user = {
    id: generateId(users),
    name: body.name,
    email: body.email,
    password: body.password
  }

  users = users.concat(user)

  response.json(user)
})

app.post('/api/tareas', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'data missing'
    })
  }

  const task = new Task({
    id: generateId(tasks),
    title: body.title,
    description: body.description,
    status: body.status,
    createdAt: body.createdAt,
    idUser: body.idUser
  })

  task.save().then(savedTask => {
    response.json(savedTask)
  })
})

app.put('/api/tareas/:id', (request, response, next) => {
  const body = request.body

  const task = {
    title: body.title,
    description: body.description,
    status: body.status,
    createdAt: body.createdAt,
    idUser: body.idUser
  }

  Task.findByIdAndUpdate(request.params.id, task, { new: true })
    .then(updatedTask => {
      response.json(updatedTask)
    })
    .catch(error => next(error))
})

app.delete('/api/tareas/:id', (request, response) => {
  Task.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'endpoint desconocido' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})