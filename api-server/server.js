const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('@koa/cors')

const catCtrl = require('./controller/category_controller')
const postCtrl = require('./controller/post_controller')
const commentCtrl = require('./controller/comment_controller')
const config = require('./config')

const app = new Koa()
const router = new Router()

const Post = require('./db').Post



// downstream error handling
app.use(async (ctx,next) => {
  try{
    await next()
  } catch(err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

// "use" for applying middleware
app.use(logger())
app.use(bodyParser())
app.use(cors())

app
.use(router.routes())
.use(router.allowedMethods())

router
.get('/',ctx=>ctx.body=help)
.get('/categories',catCtrl.getCategories)
.get('/:category/posts',postCtrl.getByCategory)
.get('/posts',postCtrl.getPosts)
.get('/posts/:id',postCtrl.getById)
.post('/posts',postCtrl.createPost)
.post('/posts/:id',postCtrl.changeVote)
.put('/posts/:id',postCtrl.updatePost)
.delete('/posts/:id',postCtrl.deletePost)
.get('/comments',commentCtrl.getComments)
.get('/posts/:id/comments', commentCtrl.getCommentsByParentId)
.get('/comments/:id', commentCtrl.getCommentsById)
.post('/comments', commentCtrl.createComment)
.post('/comments/:id',commentCtrl.changeVote)
.put('/comments/:id',commentCtrl.updateComment)
.delete('/comments/:id',commentCtrl.deleteComment)


app.listen(config.port, ()=>{
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})

const help = `
<pre>
  Welcome to the Udacity Readable API!

  Use an Authorization header to work with your own data:

  fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

  The following endpoints are available:

  GET /categories
    USAGE:
      Get all of the categories available for the app. List is found in categories.js.
      Feel free to extend this list as you desire.

  GET /:category/posts
    USAGE:
      Get all of the posts for a particular category

  GET /posts
    USAGE:
      Get all of the posts. Useful for the main page when no category is selected.

  POST /posts
    USAGE:
      Add a new post

    PARAMS:
      id - UUID should be fine, but any unique id will work
      timestamp - timestamp in whatever format you like, you can use Date.now() if you like
      title - String
      body - String
      author - String
      category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

  GET /posts/:id
    USAGE:
      Get the details of a single post

  POST /posts/:id
    USAGE:
      Used for voting on a post
    PARAMS:
      option - String: Either "upVote" or "downVote"

  PUT /posts/:id
    USAGE:
      Edit the details of an existing post
    PARAMS:
      title - String
      body - String

  DELETE /posts/:id
    USAGE:
      Sets the deleted flag for a post to 'true'.
      Sets the parentDeleted flag for all child comments to 'true'.

  GET /posts/:id/comments
    USAGE:
      Get all the comments for a single post

  POST /comments
    USAGE:
      Add a comment to a post

    PARAMS:
      id: Any unique ID. As with posts, UUID is probably the best here.
      timestamp: timestamp. Get this however you want.
      body: String
      author: String
      parentId: Should match a post id in the database.

  GET /comments/:id
    USAGE:
      Get the details for a single comment

  POST /comments/:id
    USAGE:
      Used for voting on a comment.

  PUT /comments/:id
    USAGE:
      Edit the details of an existing comment

    PARAMS:
      timestamp: timestamp. Get this however you want.
      body: String

  DELETE /comments/:id
    USAGE:
      Sets a comments deleted flag to 'true'
</pre>
`