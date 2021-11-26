const express = require("express");
const cors = require('cors');
var employeeRouter = require('./routes/employeeRouter')

const port = 3000;
const app = express();

app.use(cors({
   
    origin: ['http://localhost:5000'],
    methods: ['GET']
}
));

app.use(express.json());

app.use('/employee',employeeRouter);

app.use("/",function(req,res){
    res.send("Employee Api");
});

app.listen(port, (req,res)=>{
    console.debug(`server running on ${port}`);
})
