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
    sender: "Anh",
    receiver: "Em",
    message: 'Mỗi lần reng chuông ra về là mình cảm thấy rất hào hứng. Không phải là vì được thả về, mà là vì được đứng chờ chung với cậu ấy. Cho mình hỏi bạn có người yêu chưa, hay có đang thích ai không? - Bữa mình thấy một anh đẹp trai đi ngang qua và bị say nắng bởi nụ cười. Hôm bữa lên trường đua Phú Thọ lại thấy anh một lần nữa, cứ như mình có duyên với nhau í. Mong là anh chưa có ai để ý tới. - Gửi Thanh Ngân: "Bệnh tật có thể cướp đi sinh mạng của anh nhưng nó không thể giết chết tình yêu anh dành cho em. Dù có thế nào trái tim anh vẫn mãi mãi trao cho em như lúc đầu. Anh yêu em. Mà sao em lại không hiểu? Thôi thì anh không muốn em làm người yêu anh nữa đâu, anh chỉ muốn em làm con dâu của ba má anh thôi". THPT chuyên Trần Đại Nghĩa - Nghe nói em đó hổ báo lắm. Mình hay "dị ứng" với những kiểu này lắm. Thế mà hôm nay gặp nhỏ ở căn tin thấy yêu luôn rồi. Đep cách đơn giản, không cần son phấn. Anh thích em mặc áo dài lắm, nhỏ ơi. - Cái anh đi học hay mặc áo khoác xanh biển ấy cho em hỏi anh ấy tên gì vậy, học lớp nào được không ạ? Anh đẹp trai, để mái bằng trông đáng yêu lắm. Mình bị kích thích. Đi học ngày nào cũng phải canh me để được nhìn thấy anh.',
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
