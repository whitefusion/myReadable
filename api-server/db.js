const uri = "mongodb://localhost:27017/readable"

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose
.connect(uri,{useMongoClient: true})
.then((response) => {
  console.log("mongo connection created")
})
.catch((err) => {
  console.log("connection to mongo failed")
  console.log(err)
})

const postSchema = new mongoose.Schema({
    id: String,
    timestamp: Date,
    title:String,
    body: String,
    author: String,
    category: String,
    voteScore: Number,
    deleted: Boolean,
    commentCount: Number
})

const commentSchema = new mongoose.Schema({
    id: String,
    parentId: String,
    timestamp:Date,
    author: String,
    body: String,
    voteScore: Number,
    deleted: Boolean,
    parentDeleted: Boolean
})

exports.Post = mongoose.model("Post", postSchema)
exports.Comment = mongoose.model("Comment",commentSchema)