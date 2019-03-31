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
    sender: "Anh Đức",
    receiver: "My My",
    message: "Chúc em một khóa mới may mắn nè! Thương.",
    mp3Code: "IW87ZFCO",
  },
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
  {
    sender: "Đức",
    receiver: "Tập thể lớp 9.1",
    message: "Nhớ lớp mình quá bây ơi.",
    mp3Code: "IW6OI0FA",
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
