const express = require("express")

const server = express()
const usersRoutes = require("./users")


const port = 3001

server.use(express.json())


server.use("/users", usersRoutes)
server.listen(port, () => {
  console.log("Server Running on port: ", port)
})
