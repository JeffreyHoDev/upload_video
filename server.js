const express = require('express')
const app = express()
const multer  = require('multer')
var bodyParser = require('body-parser')
const upload = multer({ dest: 'uploads/' })
// Set port
const port = 10000

// Register middlewares
app.use(bodyParser.urlencoded({ extended: false }))

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', upload.single('video'), (req, res) => {
    console.log(req.file)
})

// Start listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})