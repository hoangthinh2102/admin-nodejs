const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   title: {
       type: String,
       required: [true, `Yêu cầu 'title'!`],
       unique: true
   },
   description: String 
})

module.exports = schema