const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRoute = require("./routes/auth")
const postsRoute = require("./routes/posts")
const commentRoute = require("./routes/comment")


const app = express();
var cors = require('cors')


app.use(cors())
app.use(bodyParser.json())
app.use("/auth", authRoute)
app.use("/posts", postsRoute)
app.use("/comment", commentRoute)


mongoose.connect("mongodb+srv://tumo:tumo1234@cluster0.4uvj2.mongodb.net/tumo?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("db connected");
})
const port = process.env.PORT || 3333
app.listen(port, () => {
    console.log(`I am running on ${port} port`);
})

