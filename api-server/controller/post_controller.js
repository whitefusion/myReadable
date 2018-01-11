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
  const posts = await Post.find(target)

  if(!posts) {
    throw new Error(`There was an error finding posts of category ${ctx.params.category}`)
  } else {
    ctx.body = posts
  }
}

exports.getById = async (ctx) => {
  const targetId = ctx.params.id
  const result = Post.findOne({id:targetId})
  if(!result) {
    throw new Error(`Post ${targetId} cannot be found !`)
  } else {
    ctx.body = {message: 'Post found !', data: result}
  }
}

exports.createPost = async (ctx) => {
  const newPost = ctx.request.body
  newPost._id = new mongoose.Types.ObjectId
  const result = await Post.create(newPost)

  if(!result) {
    throw new Error("Post fail to create")
  } else {
    ctx.body = {message: 'Post created!', data: result}
  }
}

exports.updatePost = async (ctx) => {
  const targetId = ctx.params.id
  const targetPost = await Post.findOne({id: targetId})
  const updated = ctx.request.body
  targetPost[title] = updated[title]
  targetPost[body] = updated[body]
  const result = await Post.findOneAndUpdate({id:targetId}, targetPost)

  if(!result) {
    throw new Error("Post fail to update")
  } else {
    ctx.body = {message: "Post updated!", data:result}
  }
}

exports.deletePost = async (ctx) => {
  const targetId = ctx.params.id
  const result = await Post.findOneAndRemove({id:targetId})
  if(!result) {
    throw new Error("Delete post failed")
  } else {
    ctx.status= 200
    ctx.body = {message: "success!"}
  }
}
