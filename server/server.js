//Dependenices and variables
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const freq = require('./frequency')
const PORT = process.env.PORT || 8000;

//Body Parser and Public Folder middleware
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/../react-ui/', 'public')))
app.use(express.static(path.join(__dirname, '/../react-ui/', 'build')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//send home page
// app.get('/', function(req, res, next) {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

app.get('/api/frequency', (req, res) => {
  freq.getFreq().then( (data) => {
    res.json(JSON.stringify(data));
  }).catch( (error) => {
    console.error(error)
  })
})

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/react-ui/build/index.html'))
})
//error handler middleware
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})

module.exports = app;
