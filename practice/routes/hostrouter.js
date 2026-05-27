const path = require('path');


const express = require('express');
const hostrouter=express.Router();

const rootDir = require("../../utils/pathutils");
const hostcontrolerr=require("../controler/hostcontrolerr");

hostrouter.get('/add-home', hostcontrolerr.getAddHome);
hostrouter.post('/add-home', hostcontrolerr.postAddHome);
hostrouter.get('/host-list', hostcontrolerr.gethostHomes);
hostrouter.get('/edithome/:homeId', hostcontrolerr.getEditHome);
hostrouter.post('/edithome/:homeId', hostcontrolerr.postEditHome);
hostrouter.post('/deletehome/:homeId', hostcontrolerr.postDeleteHome);

module.exports={hostrouter};
 