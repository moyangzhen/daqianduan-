var Koa=require('koa');
var app=new Koa();
const middleware=function async(ctx,next){
    console.log('this is a middleware');
    console.log(ctx.request.path)
    // next();
}
const middleware1=function async(ctx,next){
    console.log('this is a middleware1');
    console.log(ctx.request.path)
    next();
    console.log('this is a middleware1 end')
}
const middleware2=function async(ctx,next){
    console.log('this is a middleware2');
    console.log(ctx.request.path)
    next();
    console.log('this is a middleware2 end')

}
app.use(middleware1)
app.use(middleware2)
app.use(middleware)
app.listen(3000)