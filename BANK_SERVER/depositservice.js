const db = require('./dataservice')
const dab = require('./db')

const deposit = (acno, password, amount) => {
    var amount = parseInt(amount)
    // var data=db.database
    return dab.User.findOne({"acno": acno, "pswd": password})
        .then(user => {

            if(user) {
                // if (pswd == data[accno]['password']) {
                //     data[accno]['balance'] = data[accno]['balance'] + Number(amount)
                user.balance += amount
                user.transation.push({
                    "Amount": amount,
                    "Type": "Deposit",
                    "Status": "Success"

                })
                user.save()
                //   console.log("Database",data)
                return {
                    statusCode: 200,
                    status: true,
                    message: `Amount ${amount} successfuly credicted to account ${acno}, Current balance is ${user.balance}`
                }
            }
            else {
                return {
                    statusCode: 400,
                    status: false,
                    message: "transation failed"
                }
            }
        })
}
//     else {
//         return {
//             statusCode: 400,
//             status: false,
//             message: `No such an account`
//         }
//     }
//   }

const withdraw = (acno, password, amount) => {
    var amount = parseInt(amount)
//     // var data=db.database
    return dab.User.findOne({ "acno": acno, "pswd": password })
        .then(user => {

            if (user) {
                user.balance -= amount
                // if (accno in database) {
//                 //     if (pswd == database[accno]['password']) {
//                 //         if (amount < database[accno]['balance']) {
//                 // database[accno]['balance'] = database[accno]['balance'] - Number(amount)
                user.transation.push({
                    // "Mode": "Online",
                    // "Type": "withdraw",
                    // "Amount": amount
                    "Amount": amount,
                    "Type": "withdraw",
                    "Status": "Success"

                })
//                 //   console.log("Database",data)
                user.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: `Amount ${amount} successfuly withdrawed from account ${acno},Current balance is ${user.balance}`
                }
            }
            else {
                return {
                    statusCode: 400,
                    status: false,
                    message: "Insufficient balance"
                }
            }
        })
}


//     else {
//         return {
//             statusCode: 400,
//             status: false,
//             message: "password incorrect"
//         }
//     }
//     }
// }

// transation history

const transation = (acno) => {
    // database = db.database
    return dab.User.findOne({acno})
    .then(user=>{
        if(user){
        return {
            statusCode: 200,
            status: true,
            transation: user.transation,
        }
       
        }
        else{
            return {
                statusCode: 400,
                status: false,
                message:'no such a account'
    
            }
        }
    })
}

const deleteacno=(acno)=>{
    return dab.User.deleteOne({acno})
    .then(user=>{
        if(!user){
            return {
                statusCode:400,
                status:false,
                message:"operation failed"
            }
        }else{
            return{
                statusCode:200,
                status:true,
                message:"Successfully Deleted"
            }
        }
    })
}


module.exports = { deposit,withdraw, transation,deleteacno }