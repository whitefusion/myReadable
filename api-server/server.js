const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')

const config = require('./config')

const app = new Koa()
const router = new Router()

const Post = require('./db').Post

// error handling
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
app.use(async (ctx)=>{
  ctx.body = "hello world"
})

app.listen(config.port, ()=>{
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})