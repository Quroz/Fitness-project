const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()

const userAuthentication = require("./routes/userRoutes")


const app = express()
app.use(cors())
app.use(express.json())


app.use("/api/user", userAuthentication)


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() => {
    console.log("Connected to database")

    app.listen(process.env.PORT, () => {
        console.log("Listening on port", process.env.PORT)
    })
}).catch((e) => {
    console.log(e)
})