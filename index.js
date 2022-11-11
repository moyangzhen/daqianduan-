const koa=require('koa');
const Router=require('koa-router')
const cors=require('koa2-cors');
const parser = require('koa-parser')
const json=require('koa-json')
const app=new koa();
const router=new Router();
router.prefix('/api')
router.get('/',ctx=>{
    console.log(ctx)
    console.log(ctx.request)
    ctx.body='hello world'
})
router.get('/api',ctx=>{
    //get params
    const params=ctx.request.query;
    console.log(params);
    //name:'imooc' age:18
    console.log(params.name,params.age)
    ctx.body={
        name:params.name,
        age:params.age}
    })
router.post('/post',async(ctx)=>{
    if (ctx.request.body !== undefined) {
        const {body}=ctx.request
        console.log(body)
        ctx.body = {...body}
      }
})
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        // }
        // return "http://localhost:8080"; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true, // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// app.use(koaBody)
app.use(parser())
app.use(json({pretty:false,param:'pretty'}))
//1.request ,method,response
//2.api url=>function,router?
//3.ctx,async


app.use(router.routes())
.use(router.allowedMethods())
app.listen(3000)