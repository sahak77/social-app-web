const express = require("express")
const Post = require('../model/post')
const User = require('../model/user')
const check = require("./checkToken")
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const data = await Post.find().populate("userId","firstname lastname email avatar coverImgUrl _id")
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})
router.get('/post/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Post.findById(id).populate("userId", "firstname lastname email avatar coverImgUrl _id")
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})
router.post('/add', check, async (req, res) => {
    const postData = { ...req.body }
    console.log(req.body)
    postData.userId = req.user
    try {
        const post = new Post(postData)
        console.log(post)
        const data = await post.save()
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})

router.post('/add/like/:id', check, async (req, res) => {
    console.log(req.user, "ghjk")
    const id = req.params.id
    const data = await Post.findById(id).populate("userId", "firstname lastname email avatar coverImgUrl _id")
try{
    data.updateOne({ 
        $push: { 
            like: [
                req.user
            ]   
        } 
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("sdf")
        res.send("like was successfuly added");
      }
    });
    }
    catch(error){
        res.status(400).send({ error: "Something went wrong" })
    }
})

router.post('/del/like/:id', check, async (req, res) => {
    console.log(req.user, "ghjk")
    const id = req.params.id
    const data = await Post.findById(id).populate("userId", "firstname lastname email avatar coverImgUrl _id")
try{
    console.log(req.user)
    data.updateOne({ $pullAll: {like: [req.user] } 
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("sdf")
        res.send("like was successfuly deletde");
      }
    });
    }
    catch(error){
        res.status(400).send({ error: "Something went wrong" })
    }
})



router.get('/user', async (req, res) => {
    try {
        const data = await User.find()
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})


router.get('/user/:userId', check, async (req, res) => { //?
    try {
        const data = await Post.find({ userId: req.params.userId }).populate("userId", "firstname lastname email avatar coverImgUrl date info _id")
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong" })
    }
})
router.get('/profile', check, async (req, res) => {
    try {
        const data = await Post.find({ userId: req.user }).populate("userId", "firstname lastname email avatar coverImgUrl _id")
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong" })
    }
})

router.delete('/del/:id', check, async (req, res) => {
    const data = await Post.findById(req.params.id)
    if (data.userId._id == req.user) {
        await Post.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                return handleError(err);
            }
            res.send("all right")
        });
    }
    else {
        res.send("<h1>error</h1>")
    }
})

router.patch('/update/:id', check, async (req, res) => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    const postData = { ...req.body }
    const data = await Post.findById(req.params.id)
    if (data.userId._id == req.user) {
        await Post.updateOne({ _id: req.params.id }, { 
            imgUrl: postData.imgUrl,
            text: postData.text,
            date: dateTime 
    
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

module.exports = router