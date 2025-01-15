const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/', (request, response) => {
  Task.find({}).then(tasks => {
    response.json(tasks)
  })
})

tasksRouter.get('/:id', (request, response, next) => {
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

tasksRouter.post('/', (request, response, next) => {
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

  task.save()
    .then(savedTask => {
      response.json(savedTask)
    })
    .catch(error => next(error))
})

tasksRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const task = {
    title: body.title,
    description: body.description,
    status: body.status,
    createdAt: body.createdAt,
    idUser: body.idUser
  }

  Task.findByIdAndUpdate(request.params.id, task, { new: true, runValidators: true, context: 'query' })
    .then(updatedTask => {
      response.json(updatedTask)
    })
    .catch(error => next(error))
})

tasksRouter.delete('/:id', (request, response) => {
  Task.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = tasksRouter