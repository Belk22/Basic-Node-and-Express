let express = require('express');
let app = express();
let bodyParser = require("body-parser");
require('dotenv').config()
//1
//console.log("Hello World")

////##############################
//2
app.use("/public", 
  express.static(__dirname + "/public"))
//11
  app.use(bodyParser.urlencoded({extended: false}))

//7
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next()
})


//3
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });
//4

  //5
//app.get("/json", function(req, res) {
//    res.json({"message": "Hello json"})
//  
//  })

//6   
  
const mySecret = process.env['MESSAGE_STYLE']

app.get('/json', jsonHandler);
function jsonHandler(req, res) {
  let message = 'Hello json';
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({
    "message": message
  })
}
 
//8

app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time})
})

 module.exports = app;


//9
app.get("/:word/echo", function(req, res){
  res.json({echo: req.params.word})
})

//10

app.get("/name", function(req, res){
  res.json({name: req.query.first + " " + req.query.last})
})

//12
app.post("/name", function(req, res){
  res.json({name: req.body.first + " " + req.body.last})
})
