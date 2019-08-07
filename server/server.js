const path = require('path')
const Koa = require('koa')
const send = require('koa-send')

const pageRouter = require('./routers/dev-ssr')

const app = new Koa()

// 服务端渲染也分开发环境和生产环境
const isDev = process.env.NODE_ENV === 'development'

// 编写koa的中间件（过滤器），用来发现、排查错误
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch(err) {
    console.log(err)

    ctx.status = 500

    if(isDev) {
      // 如果是生产环境，直接在页面显示错误信息
      ctx.body = err.message
    } else {
      ctx.bosy = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if(ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.png', {
      root: path.join(__dirname, '../')
    })
  } else {
    await next()
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
