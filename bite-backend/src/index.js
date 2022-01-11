const express = require('express')
const keysfile = require('./keys')

const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World! ' + keysfile.keys.clientID)
})

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port)
})