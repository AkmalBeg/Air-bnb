const path=require("path");

const express = require('express');

const userrouter=require("./practice/routes/userrouter");
const {hostrouter}=require("./practice/routes/hostrouter");
const rootDir=require("./utils/pathutils");
const errorcontrolerr=require("./practice/controler/error");
const {mongoconnect} = require("./utils/mongo");

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'practice','html_model'));

app.use(express.urlencoded());
app.use(userrouter);
app.use('/host',hostrouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorcontrolerr.pageNotFound);

const port =3000;
app.listen(port,() => {
  console.log(`Server is running on port http://localhost:${port}`);
})