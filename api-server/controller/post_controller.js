const Post = require('../db').Post
const fs = require('fs')
const mongoose = require('mongoose')

exports.getPosts = async (ctx) => {
  let posts =await Post.find({})

  if(posts && posts.length === 0) {
    const default_data =JSON.parse(fs.readFileSync('./data/post_data.json', {encoding: 'utf8'}))
    default_data.forEach(p=>{
      p._id = new mongoose.Types.ObjectId
      Post.create(p)
    })
    posts=default_data
  }

  if(!posts) {
    throw new Error("There was an error retrieving posts")
  } else {
    ctx.body = posts
  }
}

exports.getByCategory = async (ctx) => {
  const target = {category: ctx.params.category}
  ctx.body = await Post.find(target)
}