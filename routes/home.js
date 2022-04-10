const express = require("express")
const router = express.Router()

router.get('/' , (req, res) =>{
    res.render("home")
});

router.get('/index' , (req, res) =>{
    res.render("index")
});

router.get('/quiz' , (req, res) =>{
    res.render("index_quiz")
});
module.exports = router
