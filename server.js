const express = require('express');
const cors=require('cors');
const createServer=require('http');
const employeeRouter = require('./routes/employeeRouter');

const app = express();
app.use(cors());
const port = 5000;


app.use('/employee' , employeeRouter);
  
app.use("/",function(req,res){
    res.send("Employee Page");
});

app.listen(port);
console.debug(`Server listening  to port ${port}`);