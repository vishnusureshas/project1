const express=require('express')
const ds=require('./dataservice')
const dt=require('./depositservice')
const jwt = require('jsonwebtoken')
const cors=require('cors')

// app creation

const app=express()
app.use(express.json())

app.use(cors({
    origin:"http://localhost:4200"
}))

// resolving http reqs
app.get('/get',(req,res)=>{
    res.send('This is  get  method')
})
// middleware
 const appMiddileware=(req,res,next)=>{
    console.log("application specific middleware")
    next()
 }
//  using middleware
app.use(appMiddileware)

const jwttokenmiddleware=((req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        console.log('Token:',token)
        const data=jwt.verify(token,'supersecretkey@123')
        if(req.body.acno==data.currentaccountnumber){
            next()
        }

    }
    catch{
        return{
            statusCode:400,
            status:false,
            message:"please login"
        }
    }
})

app.post('/post',(req,res)=>{
    res.send('This is sample post method')
})
// register API call

app.post('/register',(req,res)=>{
    ds.register(req.body.acno,req.body.password,req.body.uname)
    .then(user=>{
        if(user){
            res.status(user.statusCode).json(user)
        }
})})
// login API call
app.post('/login',(req,res)=>{
    ds.login(req.body.acno,req.body.password)
    .then(user=>{
    if(user){
        res.status(user.statusCode).json(user)
    }
    // else{
    //     res.status(result.statusCode).json(result)
    // }
})})

// withdraw API call
app.post('/withdraw',jwttokenmiddleware,(req,res)=>{
    dt.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(withdraw=>{
        if(withdraw){
            res.status(withdraw.statusCode).json(withdraw)
        }
    })
})

// deposit API calling
app.post('/deposit',jwttokenmiddleware,(req,res)=>{
    dt.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(deposit=>{
        if(deposit){
            res.status(deposit.statusCode).json(deposit)
        }
    })
})

// transation API call
app.post('/transation',(req,res)=>{
    dt.transation(req.body.acno)
    .then(transation=>{
        if(transation){
        res.status(transation.statusCode).json(transation) 
    }
})
})

// delete API call
app.delete('/deleteacno/:acno',(req,res)=>{
    dt.deleteacno(req.params.acno)
    .then(deleteacno=>{
        if(deleteacno){
            res.status(deleteacno.statusCode).json(deleteacno)
        }
    })
})



app.listen(3000,()=>(
    console.log("serve listening to the port number 3000")
))

