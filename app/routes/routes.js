module.exports = app => {
    const auth = require('../middlewares/jwt-auth');
    var router = require("express").Router();
    const cntl = require("../controllers/controller.js");
    //***************************************************
    //Common Used
    //***************************************************
    router.get("/generateToken", cntl.generateToken);

    router.post("/getlogs", cntl.getLogs);

    router.get("/getcalls", cntl.getCalls);

    router.post("/savetoken", cntl.saveToken);

    router.get("/getsockets", cntl.getSockets);

    router.post("/savesockets", cntl.saveSockets);
    
    router.post("/register", cntl.register);
    
    router.post("/login", cntl.login);
    
    router.post("/GetDevice", cntl.getDevice);
  
    router.post("/SetDevice", cntl.setDevice);
  
    router.delete("/DeleteDevice", cntl.deleteDevice);
  
    router.post("/GetUsers", cntl.getUsers);

    router.get("/GetDeviceType", cntl.getDeviceType);
  
    //***************************************************

    app.use('/api', router);
    
    //***************************************************
    //***************************************************
    //***************************************************
};