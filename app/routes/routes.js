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
    
    //***************************************************

    app.use('/api', router);
    
    //***************************************************
    //***************************************************
    //***************************************************
};