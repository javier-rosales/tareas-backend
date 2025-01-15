const usersRouter = require('express').Router()

app.post('/', (request, response) => {
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

module.exports = usersRouter