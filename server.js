require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const net = require('net');
const app = express();
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
var sockets = [];
const server = net.createServer();
server.listen(443, () => {
  //console.log('TCP Server is running on port ' + port + '.');
});

// simple route
app.get("/", (req, res) => {
  res.send({status:true, result:'test get request'});
});

app.post("/", (req, res) => {
  console.log("data*******",req.body);
  data = req.body.data;
  // const sqlQuery = 'sp_setdevicedata :message, :ip';
  // const result = await sequelize.query(sqlQuery, { replacements: {message: req.body.token, ip: req.body.ip}});
  // console.log("result-sp_insertToken*****",result);
  res.send({status:true, result:data});
});

require("./app/routes/routes")(app);

const PORT = 8124;
app.listen(PORT, () => {
  console.log(`Server is running on port 8124.`);
});