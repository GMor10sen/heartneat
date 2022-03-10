const { readFile } = require('fs').promises;
const express = require('express');
const {response} = require("express");

const app = express();

app.set('view engine', 'ejs')
app.use(logger)
app.use(express.static("public"))
app.get('/' , async (req, res) =>{
    res.render("index", {text:'World'})
});

const userRouter = require('./routes/home')

app.use('/home', userRouter)

app.listen(process.env.PORT || 3000, () => console.log('App is available on http://localhost:3000'));

function logger(req, res, next) {
    console.log("Path accessed " + req.originalUrl)
    next()
}
//USE this format to create new pages, add ejs file into views to modify the page
/*app.get('/example' , (req, res) =>{
    console.log('here')
    res.render("example")
});

//USE this format to dynamically create route
router.get("/:id", (req, res) => {
    res.send('Get Home directory ith ID ${req.params.id}')
})
//USE an example of router.PARAM that is a middle ware function
//works with above example
router.param("id", (req, res, next, id) => {
    req.user = user[is]
    next runs the next step up in stack
    next()
})
*/