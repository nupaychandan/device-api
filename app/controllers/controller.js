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
  if(req.body.name == "" || req.body.name == null){
    res.send({status:false, result:"Name should not be blank."});  
  }
  if(req.body.emailId == "" || req.body.emailId == null){
    res.send({status:false, result:"emailId should not be blank."});  
  }
  if(req.body.password == "" || req.body.password == null){
    res.send({status:false, result:"Password should not be blank."});  
  }
  if(req.body.mobileno == "" || req.body.mobileno == null){
    res.send({status:false, result:"MobileNo should not be blank."});  
  }
  console.log("reg data*******",req.body);
  const sqlQuery = 'sp_RegisterUser :Name, :EmailId, :Password, :MobileNo';
  const result = await sequelize.query(sqlQuery, { replacements: {Name: req.body.name, EmailId: req.body.emailId,Password:req.body.password,MobileNo:req.body.mobileno}});
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


exports.getDevice = async (req, res) => {
  if(req.body.DeviceType == 0 || req.body.DeviceType == null){
    res.send({status:false, result:"Device type must be greater than 0."});  
  }
  console.log("device data*******",req.body);
  const sqlQuery = 'sp_GetDevice :Id, :UserId, :DeviceType';
  const result = await sequelize.query(sqlQuery, { replacements: {Id: req.body.Id, UserId: req.body.UserId,
  DeviceType : req.body.DeviceType}});
  console.log("result-sp_GetDevice*****",result);
  res.send({status:true, result:result[0]});
};

exports.setDevice = async (req, res) => {
  console.log("set device data*******",req.body);
  const sqlQuery = 'sp_SetDevice :Id, :Type, :Name, :Description, :ZoneId, :Lt, :Lg, :UserId';
  const result = await sequelize.query(sqlQuery, { replacements: {Id: req.body.Id,Type: req.body.Type,Name: req.body.Name,Description: req.body.Description,ZoneId:req.body.ZoneId,Lt: req.body.Lt,Lg: req.body.Lg,UserId: req.body.UserId}});
  console.log("result-sp_SetDevice*****",result);
  res.send({status:true, result:result[0]});
};

exports.deleteDevice = async (req, res) => {
  console.log("delete device data*******",req.body);
  const sqlQuery = 'sp_DeleteDevice :Id';
  const result = await sequelize.query(sqlQuery, { replacements: {Id: req.body.Id}});
  console.log("result-sp_DeleteDevice*****",result);
  res.send({status:true, result:result[0]});
};

exports.getUsers = async (req, res) => {
  console.log("get user data*******",req.body);
  const sqlQuery = 'sp_GetUser :UserId';
  const result = await sequelize.query(sqlQuery, { replacements: {UserId: req.body.UserId}});
  console.log("result-sp_GetUser*****",result);
  res.send({status:true, result:result[0]});
};

exports.getDeviceType = async (req, res) => {
  const sqlQuery = 'sp_GetDeviceType';
  const result = await sequelize.query(sqlQuery);
  console.log("result-DeviceType*****",result);
  res.send({status:true, result:result[0]});
};


exports.changePassword = async (req, res) => {
  if(req.body.UserId < 0|| req.body.UserId == null){
    res.send({status:false, result:"UserId must be greater than 0."});  
  }
  if(req.body.Password == "" || req.body.Password == null){
    res.send({status:false, result:"Password should not be blank."});  
  }
  if(req.body.OldPassword == "" || req.body.OldPassword == null){
    res.send({status:false, result:"OldPassword should not be blank."});  
  }

  const sqlQuery = 'sp_ChangePassword :UserId ,:OldPassword, :Password';
  const result = await sequelize.query(sqlQuery, { replacements: {UserId: req.body.UserId ,OldPassword :req.body.OldPassword ,Password :req.body.Password }});
  console.log("result-Change Password*****",result);
    res.send({status:result[0][0].status, result:result[0][0].Message});
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