const bcrypt = require("bcryptjs")
const users = []


module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPass = bcrypt.compareSync(password, users[i].password)
        if (users[i].username === username && existingPass) {
            console.log("yo")
            let userObj = {...users[i]}
            delete userObj.password
            console.log(userObj)
            res.status(200).send(userObj)
          }
        }
        res.status(400).send("User not found.")
      },
   
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {username, email, firstName, lastName, password} = req.body
        
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        
        console.log(passwordHash)


        const newUser = {
          username,
          email,
          firstName,
          lastName,
          password: passwordHash,
        }
        users.push(newUser)
        let noPass = {...newUser}
        delete noPass.password

        
        res.status(200).send(noPass)
    }
}



