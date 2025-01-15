const express = require('express')
let users = require('./users')
let tasks = require('./tasks')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const app = express()
app.use(express.json())
app.use(requestLogger)

const generateId = table => {
  const maxId = table.length > 0
    ? Math.max(...table.map(n => Number(n.id)))
    : 0
  return maxId + 1
}

app.get('/api/tareas', (request, response) => {
  response.json(tasks)
})

app.get('/api/tareas/:id', (request, response) => {
  const id = +request.params.id
  const task = tasks.find(task => task.id === id)

  if (task) {
    response.json(task)
  } else {
    response.status(404).end()
  }
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

  const task = {
    id: generateId(tasks),
    title: body.title,
    description: body.description,
    status: body.status,
    createdAt: body.createdAt,
    idUser: body.idUser
  }

  tasks = tasks.concat(task)

  response.json(task)
})

app.delete('/api/tareas/:id', (request, response) => {
  const id = +request.params.id
  tasks = tasks.filter(task => task.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'endpoint desconocido' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})