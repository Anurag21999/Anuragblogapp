const { MongoClient } = require('mongodb')

const URL = process.env.MONGODB_URI||'mongodb://localhost:27017';

const connectdb = (dbName) => {
    return MongoClient.connect(URL).then(client => client.db(dbName))
  }
  
 

  // function getallblogs(){
  //     return connectdb('testdb').then(db=>{
  //         return db.collection('blogs').find()
  //     }).then(blogscursor=>blogscursor.toarrray())
  // }


const getallblogs=()=>
connectdb('test1db')
.then(db=>db.collection('blogs').find())
.then(b => b.toArray() )


const addblogs = blog =>
    connectdb('test1db')
    .then(db => db.collection('blogs'))
    .then(collection => collection.insertOne(blog))
    
const delblogs = blog =>
    connectdb('test1db')
    .then(db => db.collection('blogs'))
    .then(collection =>collection.deleteOne(_id))


module.exports={
   getallblogs,
   addblogs,
   delblogs
}