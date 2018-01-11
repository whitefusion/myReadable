const Comment = require('../db').Comment
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