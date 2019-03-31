var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
var parser = bodyParser.urlencoded({extended: false});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3001);

var confessions =  [
  {
    sender: "Lan",
    receiver: "Điệp",
    message: "From Lan with love.",
    mp3Code: "ZW6A9I0A",
  },
  {
    sender: "Đức",
    receiver: "Tập thể lớp 9.1",
    message: "Nhớ lớp mình quá bây ơi.",
    mp3Code: "ZW6FEBZA",
  },
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
];

app.get("/", function(req, res) {
  res.render("home");
})

app.get("/getConfessions", function(req, res) {
  res.send(confessions);
})

app.get("/create", function(req, res) {
  res.render("create");
})

app.post("/createConfession", parser, function(req, res) {
  const newConfession = req.body;
  confessions = [newConfession].concat(confessions);
  res.send({success: true});
})
