const net = require('net');
const jwt = require('jsonwebtoken');
const db = require("../models");
const sequelize = db.sequelize;
var sockets = [];


exports.getLogs = async (req, res) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  var body = req.body;
  const sqlQuery = 'sp_GetDailyLogs :Id';
  const result = await sequelize.query(sqlQuery, { replacements: { Id: 0}});
  console.log("result-Status_Get*****",result);
  res.send({status:true, result:result[0]});
};

exports.getCalls = async (req, res) => {
  const sqlQuery = 'sp_getCalls';
  const result = await sequelize.query(sqlQuery);
  console.log("result-call-dat*****",result);
  res.send({status:true, result:result[0]});

};

exports.register = async(req,res)=>{
  console.log("reg data*******",req.body);
  const sqlQuery = 'sp_RegisterDevice :Name, :EmailId, :Password';
  const result = await sequelize.query(sqlQuery, { replacements: {Name: req.body.name, EmailId: req.body.emailId,Password:req.body.password}});
  console.log("result-sp_RegisterDevice*****",result);
  res.send({status:true, result:result[0]});
}



exports.login = async(req,res)=>{
  console.log("login data*******",req.body);
  const sqlQuery = 'sp_Login  :EmailId, :Password';
  const result = await sequelize.query(sqlQuery, { replacements: {EmailId: req.body.emailId,Password:req.body.password}});
  console.log("result-sp_Login*****",result);
  res.send({status:true, result:result[0]});
}

exports.saveToken = async (req, res) => {
  console.log("token data*******",req.body);
  const sqlQuery = 'sp_setdevicedata :message, :ip';
  const result = await sequelize.query(sqlQuery, { replacements: {message: req.body.token, ip: req.body.ip}});
  console.log("result-sp_insertToken*****",result);
  res.send({status:true, result:result[0]});
};

exports.saveSockets = async (req, res) => {
  console.log("sockets data*******",req.body);
  sockets = req.body.sockets;
  // const sqlQuery = 'sp_setdevicedata :message, :ip';
  // const result = await sequelize.query(sqlQuery, { replacements: {message: req.body.token, ip: req.body.ip}});
  // console.log("result-sp_insertToken*****",result);
  res.send({status:true, result:sockets});
};

// exports.getSockets = async (req, res) => {
//   console.log("get sockets data*******", sockets);
//   res.send({status:true, result:sockets});
// };

exports.getSockets = async (req, res) => {
  const server = net.createServer();
  server.listen(443, () => {
    //console.log('TCP Server is running on port ' + port + '.');
  });
  console.log("get sockets data*******", sockets);
  server.on('connection', function(sockInner) {
    sockets.forEach(function(sock, index, array) {
      sock.write('Chandan Message');
    });
  })
  res.send({status:true, result:sockets});
};

// exports.sendData = async (req, res) => {
//   sockets.forEach(function(sock, index, array) {
//     sock.write(message);
//   });
// };
//***************************************************
//***************************************************
exports.generateToken = async (req, res) => {
  const token = jwt.sign({ username: 'admin'},process.env.JWT_SECRET);
  res.send({status:true, token:token});
};