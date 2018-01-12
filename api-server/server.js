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
.get('/',ctx=>ctx.body="hello world")
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