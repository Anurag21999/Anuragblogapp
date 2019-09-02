const express=require('express')
const app=express()
const { getallblogs,addblogs,delblogs}=require('./database')
app.use(express.urlencoded({extended: true}))
// const comment=[{
//     com:'',
// }]
const SERVER_PORT= process.env.PORT||3331
app.set('view engine','hbs')

app.get('/',(req,res)=>{
    getallblogs().then(blogs=>{
        const blogId=req.query.blog
        const selectedBlog=blogs.find(b=> b._id==blogId)
        console.log(selectedBlog)
        res.render('index',{blogs,selectedBlog})
    })
})

app.get('/add',(req,res)=>{ 
    res.render('add')           
})

app.post('/',(req,res)=>{
    addblogs({
        title:req.body.title,
        body:req.body.body,
        com:req.body.com,
    }).then(result=>{
        res.redirect('/?blog='+result.ops[0]._id)

    })
    
})
// app.get('/upd',(req,res)=>{
//   res.render('update')
// })


// app.post('/upd',(req,res)=>{
//     getallblogs().then(blogs=>{
//         const blogId=req.body.title
//         const selectedBlog=blogs.find(b=> b._id==blogId)
//         console.log(selectedBlog)
//     res.render('update',{blogs,selectedBlog})
// })
// })
app.get('/delete/:_id',(req,res)=>{
 delblogs(
     _id=req.param._id
 ).then(()=>{
     res.redirect('/')
 })
})


app.listen(SERVER_PORT,()=>{
console.log("started server")
})