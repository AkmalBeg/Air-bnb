const express = require('express');
const parsebody = require('body-parser');
const app = express();
app.use(parsebody.urlencoded({extended:true}));
//first middleware
/*
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`);
  next();
})
//second middleware
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`);
  next();
})

app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`);
  res.send("<h1>Hello World</h1>");
})*/

app.get('/',(req,res,next)=>{
  console.log("handler for GET /", req.url,req.method);
  res.send("<h1>Hello World 1</h1>");
});

app.get('/contact-us',(req,res,next)=>{
  console.log("handler for GET /contact-us", req.url,req.method);
  res.send(
    `<h1>Hello World 2</h1>
    <form action="/contact-us" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      <br>
      <input type="submit" value="Submit">
    </form>
    `);
});

app.post('/contact-us',(req,res,next)=>{
  console.log("handler for POST /contact-us", req.url,req.method,req.body);
  res.send("<h1>we will get back to you soon</h1>");
});


app.use((req,res,next)=>{
  console.log( req.url,req.method);
  res.status(404).send("<h1>Page Not Found</h1>");
});

const port =3000;
app.listen(port,() => {
  console.log(`Server is running on port http://localhost:${port}`);
});