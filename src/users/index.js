const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

//get all users
router.get("/", (req, res) =>{
    const usersFilePath = path.join(__dirname, "users.json")
    const fileAsBuffer = fs.readFileSync(usersFilePath)
    const fileContent = fileAsBuffer.toString()
    const fileAJSOBJECT = JSON.parse(fileContent)

    res.send(fileAJSOBJECT)
})
//get by id
router.get("/:id", (req, res) =>{
    const usersFilePath = path.join(__dirname, "users.json")
    const fileAsBuffer = fs.readFileSync(usersFilePath)
    const fileContent = fileAsBuffer.toString()
    const usersArray = JSON.parse(fileContent)

    const idComingFromRequest = req.params.id

   const user = usersArray.filter( user => user.ID === idComingFromRequest)
    res.send("USER", user)
})

//post a new user
router.post("/", (req, res) =>{
    const usersFilePath = path.join(__dirname, "users.json")
    const fileAsBuffer = fs.readFileSync(usersFilePath)
    const fileAsAString = fileAsBuffer.toString()
    const usersArray = JSON.parse(fileAsAString)
    

    const newUser = req.body
    newUser.ID = uniqid()
    usersArray.push(newUser)


    fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))


    res.status(201).send(newUser.ID)
})
//edit user
router.put("/:id", (req, res) =>{
    const usersFilePath = path.join(__dirname, "users.json")
    const fileAsBuffer = fs.readFileSync(usersFilePath)
    const fileAsAString = fileAsBuffer.toString()
    const usersArray = JSON.parse(fileAsAString)

    const newUsersArray = usersArray.filter(user => user.ID !== req.params.id)

    const modifiedUser = req.body
    modifiedUser.ID = req.params.id

    newUsersArray.push(modifiedUser)

    fs.writeFileSync(usersFilePath, JSON.stringify(newUsersArray))
    res.send("User edited")
})
//delete user
router.delete("/:id", (req, res) =>{
    const usersFilePath = path.join(__dirname, "users.json")
    const fileAsBuffer = fs.readFileSync(usersFilePath)
    const fileAsAString = fileAsBuffer.toString()
    const usersArray = JSON.parse(fileAsAString)

    const newUsersArray = usersArray.filter(user => user.ID !== req.params.id)


    fs.writeFileSync(usersFilePath, JSON.stringify(newUsersArray))


    res.send("Delete users route")
})


module.exports = router