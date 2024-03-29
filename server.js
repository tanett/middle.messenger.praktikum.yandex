const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env. port || 3000

app.use(express.static(path.join(__dirname + '/dist')))

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})
