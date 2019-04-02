const PORT = process.env.PORT || 3000;
const MAX_TOTAL = 5;
const PAGE_SIZE = 3;

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
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
  {
    sender: "Donald Trump",
    receiver: "Kim Jong Un",
    message: "Happy new year, man.",
    mp3Code: "ZW6EA88Z",
  },
];
confessions = confessions.concat(confessions);
confessions = confessions.concat(confessions);

app.get("/", function(req, res) {
  res.render("home");
})

app.get("/getConfessions", function(req, res) {
  const pageNumber = req.query.pageNumber;
  const totalItems = confessions.length;
  var result = confessions.slice((pageNumber-1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
  res.send({
    confessions: result,
    totalPage: Math.ceil(confessions.length/PAGE_SIZE)
  });
})

app.post("/writeConfession", parser, function(req, res) {
  const newConfession = req.body;
  confessions = [newConfession].concat(confessions);
  if (confessions.length > MAX_TOTAL) {
    confessions = confessions.slice(0, MAX_TOTAL);
  } // keep only MAX_TOTAL items
  res.send({
    success: true,
    confessions
  });
})
