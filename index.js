const PORT = process.env.PORT || 3000;
const AMOUNT_PER_DAY = 100;

var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
var parser = bodyParser.urlencoded({extended: false});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(PORT);

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

app.post("/writeConfession", parser, function(req, res) {
  if (confessions.length >= AMOUNT_PER_DAY) {
    res.send({
      success: false,
      message: "Full"
    });
  } else {
    const newConfession = req.body;
    confessions = [newConfession].concat(confessions);
    res.send({
      success: true,
      confessions
    });
  }
})
