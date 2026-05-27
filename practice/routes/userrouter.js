const path=require("path");
const express=require("express");
const userrouter=express.Router();

const usercontrolerr=require("../controler/usercontroler");

userrouter.get('/', usercontrolerr.getHomes);
userrouter.get('/booking',usercontrolerr.getBooking);
userrouter.get('/favlist',usercontrolerr.getfavlist);
userrouter.get('/main',usercontrolerr.getmainHomes);
userrouter.get('/main/:homeId', usercontrolerr.getHomeById);
userrouter.post('/favlist',usercontrolerr.postfavlist);
userrouter.post('/store/favlist/deletehome/:homeId', usercontrolerr.postremoveFromFav);
module.exports=userrouter;