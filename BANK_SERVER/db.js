const mongoose = require('mongoose')


// state connection string

mongoose.connect('mongodb://localhost:27017/ANGJULY',{
    useNewUrlParser:true}    
)
//  model creation collection

const User = mongoose.model('User',{
    acno:Number,
    uname:String,
    pswd:String,
    balance:Number,
    transation:Array
})

module.exports={User}
