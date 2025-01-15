const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Conectando a', url)

mongoose.connect(url)
  .then(result => {
    console.log('Conectado a MongoDB')
  })
  .catch(error => {
    console.log('Error al conectar con MongoDB:', error.message)
  })

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  createdAt: String
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskSchema)