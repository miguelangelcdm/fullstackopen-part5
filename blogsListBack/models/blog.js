require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  author: String,
  url: {
    type: String,
    required:true,
  },
  likes: {
    type:Number,
    default:0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

blogSchema.set('toJSON',{
  transform:(document,returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports=mongoose.model('Blog',blogSchema)