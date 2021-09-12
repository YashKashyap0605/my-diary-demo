//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "This Area contains all the posts made by you :)";
const aboutContent = "This is just a mini project named as MY PERSONAL DIARY . It allows you to COMPOSE your content with your desired TITLE and CONTENT. Composing post is a very easy task you just have to type in the desired text and you will easily be able to post it on the home page just by clicking on the button. It keeps al your data private and no one else has access to it. For any queries and suggestions you can move to the CONTACT US section and find my email id and send in your suggestions along with your username and stuff. The HOME sections simply contains all the contents composed by you along with the titles in it. Hope you enjoy using my simple project. Currently I am not allowing users to add images because I have only a limited 512mb provided by the MONGODB server for free usage and as I am just a college student I cannot pay for the server costs so Sorry for that. Updates will be made just keep supporting . THANK YOU.";
const contactContent = "My Personal Email: yashkashyap0605@gmail.com. Feel free to drop by your suggestions for further updates :)";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
