const jwt = require('jsonwebtoken')
const db = require('./db')

database = {
  1000: { accno: 1000, uname: "Vishnu", password: 1000, balance: 10000, transation: [] }
}

const register = (acno, pswd, uname) => {
  return db.User.findOne({ acno })
    .then(user => {
      if (user) {

        return {
          statusCode: 422,
          status: false,
          message: "User already exits"
        }
      } else {
        const newUser = new db.User({
          acno,
          uname,
          pswd,
          balance: 0,
          transation: []
        })
        // To save data into db
        newUser.save()
        //car['value']=90     
        return {
          statusCode: 200,
          status: true,
          message: "User created successfully"
        }
      }
    })

}


const login = (acno, password) => {

  return db.User.findOne({ "acno":acno, 'pswd': password })
    .then(user => {
      if (user) {
        currentname = user.uname
        currentacno = acno
        const token = jwt.sign({
          currentaccountnumber: acno
        }, 'supersecretkey@123')
        return {
          statusCode: 200,
          status: true,
          message: "Login successful",
          token,
          currentname,
          currentacno
        }
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "Not registered"
        }
      }
      //   }else{

      //     return {
      //       statusCode:400,
      //       status:false,
      //       message:"Incorrect password"
      //     }
      //   }
      // }

    })
}

// const withdraw = (acno, pswd, amount) => {
//   if (acno in database) {
//       if (pswd == database[acno]['password']) {
//           if (amount < database[acno]['balance']) {
//               database[acno]['balance'] = database[acno]['balance'] - Number(amount)
//               return {
//                   statusCode: 200,
//                   status: true,
//                   message: `Amount ${amount} successfuly withdrawed. Current balance is ${database[acno]['balance']}`
//               }
//           }
//           else {
//               return {
//                   statusCode: 400,
//                   status: false,
//                   message: "Insufficient balance"
//               }
//           }
//       }
//       else {
//           return {
//               statusCode: 400,
//               status: false,
//               message: "password incorrect"
//           }
//       }
//       }

// }

// const deposit = (acno, pswd, amount) => {
//   if (acno in database) {
//       if (pswd == database[acno]['password']) {
//           database[acno]['balance'] = database[acno]['balance'] + Number(amount)
//           return {
//               statusCode: 200,
//               status: true,
//               message: `Amount ${amount} successfuly deposit. Current balance is ${database[acno]['balance']}`
//           }
//       }
//       else {
//           return {
//               statusCode: 400,
//               status: false,
//               message: "password incorrect"
//           }
//       }
//   }
//   else {
//       return {
//           statusCode: 400,
//           status: false,
//           message: "No such an account"
//       }
//   }
// }




module.exports = { register, login, database }