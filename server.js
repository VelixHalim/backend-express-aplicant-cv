const express= require("express")
const app =express()
const {PORT}=require('./configs/config')
const cors = require('cors')
const path= require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || PORT

//route file
const cv = require("./routes/aplicantroutes")

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(express.static(path.join(__dirname,'public')))

//route
app.use('/cv',cv)
app.get("/",(req,res)=>res.send("halo"))

app.listen(port, ()=> console.log(`Server listening on PORT ${port}`))