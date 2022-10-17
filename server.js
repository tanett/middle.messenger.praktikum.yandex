const express = require('express')
const path = require('path')
const history = require('express-history-api-fallback')

const app = express()
const PORT = process.env.port || 3000

app.use(express.static(path.join(__dirname + '/dist')))
app.use(history('index.html', { root: './dist' }));
app.use('*', (req, res)=>{
  res.status(200).sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})
