const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const router = express.Router();

const LoginModel = require("../model/login.model");
const config = require("../config/db");

// router.get('*', (req, res, next) => {
//     res.sendFile(path.resolve('./index.html'));
//     next();
// });

router.get("/", (req, res, next) => {
    res.json({
        message:"Welcome to APIs"
    });
});
router.post("/login",  (req, res, next) => {
    
    LoginModel.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
    
        if (!user) {
          res.status(401).send({success: false, message: 'Email or Password is incorrect.'});
        } else {
            user.comparePassword(req.body.password,function(err,isMatch){
                if(err) res.status(401).send({success: false, message: 'Email or Password is incorrect..'});
                if(!isMatch) res.status(200).send({success: false, message: 'Email or Password is incorrect...'});
                else{
                    jwt.sign({user}, config.secret,{
                        expiresIn: '15m' // expires in 15 minutes
                    },(err,token)=>{
                        let usr = {username: user.username,token:"JWT "+token};
                        res.status(200).send({success: true, message: 'Login Successfull',user:usr});
                    });
                }
            })
            
        }
    });
});
router.get("/profile", authorizeRequest,(req, res, next) => {
    jwt.verify(req.token,config.secret, (err,data) => {
        if(err) res.sendStatus(403);
        else{
            res.json({
                message:"Welcome to Protected",
                authData:data
            });                    
        }
    });
    
});

function authorizeRequest(req, res, next){   
    let token = getToken(req.headers); 
    if(token){
        req.token = token;
    }else{
        res.sendStatus(403);
    }
    next();
}
getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
}
module.exports = router;