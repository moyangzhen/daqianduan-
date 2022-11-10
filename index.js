const koa=require('koa');
const Router=require('koa-router')
const cors=require('@koa/cors');
const koaBody=require('koa-body')
const app=new koa();
const router=new Router();
router.get('/',ctx=>{
    console.log(ctx)
    console.log(ctx.request)
    ctx.body='hello world'
})
router.get('/api',ctx=>{
    console.log(ctx)
    console.log(ctx.request)
    ctx.body='hello api'
})
router.get('/async',async(ctx)=>{
    let result=await new Promise((resolve)=>{
        setTimeout(() => {
            resolve('Hello world 2s later')
        }, 2000);
    })
    ctx.body=result
})

router.post('/post',async(ctx)=>{
    let {body}=ctx.request
    console.log(body);
    console.log(ctx.request)
    ctx.body={
        ...body
    }
})
app.use(koaBody)
app.use(cors)

//1.request ,method,response
//2.api url=>function,router?
//3.ctx,async


app.use(router.routes())
.use(router.allowedMethods())
app.listen(3000)