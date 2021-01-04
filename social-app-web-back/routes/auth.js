const express = require('express')
const router = express.Router()
const User = require('../model/user')
const Post = require('../model/post')
const Comment = require('../model/comment')
const jwt = require('jsonwebtoken');
const check = require('./checkToken')
const bcrypt = require('bcryptjs');


router.get('/', async (req, res) => {
    try {
        const data = await User.find().populate("userId","firstname lastname email avatar coverImgUrl _id")
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})
router.post("/signin", async (req, res) => {
    try {
        const emailExists = await User.findOne({ email: req.body.email })
        if (!emailExists) {
            return res.status(400).send({ error: "Please register, this email doesn't exist" })
        }
        const samePassword = await bcrypt.compare(req.body.password, emailExists.password)
        if (!samePassword) {
            return res.status(400).send({ error: "Please input right password" })
        }
        const token = jwt.sign({ id: emailExists._id }, 'tumo_students');
        res.send({auth_token:token})
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})
router.post("/signup", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    const profileData = {...req.body}
    profileData.password = hash
    try {
        const existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            return res.status(400).send({ error: "This email already exists" })
        }
        const user = new User(profileData)
        const data = await user.save()
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})
router.get("/profile",check, async (req, res) => {
    try {
        const data = await User.findById(req.user)
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send({error: "Something went wrong"})

    }
})

router.get('/user/:id', check,async (req, res) => {
    const id = req.params.id
    try {
        const data = await User.findById(id)
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })

    }
})

router.patch('/updateinfo/:id', check, async (req, res) => {
    const userData = { ...req.body }
    const data = await User.findById(req.params.id)
    if (data._id == req.user) {
        await User.updateOne({ _id: req.params.id }, { 
            firstname: userData.firstname, 
            lastname: userData.lastname,
            info: userData.info
        }, (err, res) => {
            if (err) {
                return handleError(err);
            }
        });
        return res.send("sax lava")
    }
    else{
        res.send("<h1>error</h1>")
    }
})
router.patch('/updatecoverimg/:id', check, async (req, res) => {
    const userData = { ...req.body }
    const data = await User.findById(req.params.id)
    if (data._id == req.user) {
        await User.updateOne({ _id: req.params.id }, { 
            coverImgUrl: userData.coverImgUrl,
        }, (err, res) => {
            if (err) {
                return handleError(err);
            }
        });
        return res.send("sax lava")
    }
    else{
        res.send("<h1>error</h1>")
    }
})
router.patch('/updateavatar/:id', check, async (req, res) => {
    const userData = { ...req.body }
    const data = await User.findById(req.params.id)
    if (data._id == req.user) {
        await User.updateOne({ _id: req.params.id }, { 
            avatar: userData.avatar, 
        }, (err, res) => {
            if (err) {
                return handleError(err);
            }
        });
        return res.send("sax lava")
    }
    else{
        res.send("<h1>error</h1>")
    }
})

router.delete('/del', check, async (req, res) => {
    const user = await User.findById(req.user)
    const comment = await Comment.find({ userId: req.user })
    const posts = await Post.find({like: req.user})
    try{
        await Comment.deleteMany({ userId: req.user }, function (err) {
            if (err) {
                return handleError(err);
            }
        });
        await Post.deleteMany({ userId: req.user }, function (err) {
            if (err) {
                return handleError(err);
            }
        });
        await User.deleteOne({ _id: req.user }, function (err) {
            if (err) {
                return handleError(err);
            }
        });  
        res.send("account was succsessfully deleted ") 

}
  catch(e){
        res.send(e)
    }
    
})

module.exports = router
