//dependencies required for the app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
let list = [];

let complete = [];

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    res.render("index", { list: list, complete: complete });
});

//post route for adding new task 
app.post("/add", function(req, res) {
    console.log(req.body)
    let newList = req.body.newList;
    //add the new task from the post route 
    list.push(newList);
    res.redirect("/");
});

app.post("/completed", function(req, res) {
    let completeList = req.body.check;

    if(Array.isArray(completeList)) {
        for(let i = 0; i < completeList.length; i++) {
            complete.push(completeList[i]);
            list.splice(list.indexOf(completeList[i]), 1);
        }
    } else {
        complete.push(completeList);
        list.splice(list.indexOf(completeList), 1);
    }

    res.redirect("/");
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});