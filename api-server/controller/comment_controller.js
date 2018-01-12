const Comment = require('../db').Comment
const Post = require('../db').Post
const fs = require('fs')
const mongoose = require('mongoose')

exports.getComments = async (ctx) => {
  let comments =await Comment.find({})

  if(comments && Object.keys(comments).length === 0) {
    const default_data =JSON.parse(fs.readFileSync('./data/comments_data.json', {encoding: 'utf8'}))
    default_data.forEach(c=>{
      c._id = new mongoose.Types.ObjectId
      Comment.create(c)
    })
    comments=default_data
  }

  if(!comments) {
    throw new Error("There was an error retrieving posts")
  } else {
    ctx.body = comments
  }
}

exports.getCommentsByParentId =async (ctx) => {
  const parentId = ctx.params.id
  const result = await Comment.find({parentId})

  ctx.body = result
}

exports.getCommentsById =async (ctx) => {
  const id = ctx.params.id
  const result = await Comment.findOne({id})

  if(!result) {
    throw new Error(`Comment ${id} cannot be found !`)
  } else {
    ctx.body = result
  }
}

exports.createComment = async (ctx) => {
  const newComment = ctx.request.body
  newComment._id = new Mongoose.Types.ObjectId
  newComment.voteScore = 0
  newComment.deleted = false
  newComment.parentDeleted = false
  const createRes = await Comment.create(newComment)
  if(!createRes) {
    throw new Error("Fail to create comment")
  }

  const targetPost = await Post.findOne({id:newComment.parentId})
  targetPost['commentCount']+=1
  const result = await Post.findOneAndUpdate({id:newComment.parentId},targetPost)

  if(!result) {
    throw new Error("Fail to create comment")
  } else {
    ctx.body = {message:"comment created" , data:createRes}
  }
}

exports.updateComment = async (ctx) => {
  const {body} = ctx.request.body
  const targetId = ctx.params.id
  const targetComment = await Comment.findOne({id:targetId})
  targetComment["body"] = body

  const result = await Comment.findByIdAndUpdate({id:targetId},targetComment)

  if(!result) {
    throw new Error(`Fail to update comment ${targetId}`)
  } else {
    ctx.body = result
  }
}

exports.deleteComment =async (ctx) => {
  const id = ctx.params.id
  const deleteRes = await Comment.findByIdAndRemove({id})

  if(!deleteRes) {
    throw new Error(`Fail to delete ${id}`)
  }

  const targetPost = await Post.findOne({id:newComment.parentId})
  targetPost['commentCount']-=1
  const result = await Post.findOneAndUpdate({id:newComment.parentId},targetPost)
  
  if(!result) {
    throw new Error(`Fail to delete ${id}`)
  } else {
    ctx.status = 200
    ctx.body = {message: "success !"}
  }
}

exports.changeVote = async (ctx) => {
  const option = ctx.request.body.option
  const targetId = ctx.params.id
  const targetComment = await Comment.findOne({id:targetId})
  if(option === "upVote"){
    targetComment.voteScore+=1
  } else {
    targetComment.voteScore-=1
  }

  const result = await Comment.findOneAndUpdate({id:targetId}, targetComment)

  if(!result) {
    throw new Error("Fail to change score")
  } else {
    ctx.body = {message:'score updated!'}
  }
}