const mongoose = require('mongoose')
const schema = require('./schema')

const MODEL_NAME = 'products'
const COLLECTION_NAME = 'products'

const model = mongoose.model(
    MODEL_NAME,
    schema,
    COLLECTION_NAME
)

// model.find()
// model.findOne()
// model.create()
// model.findByIdAndUpdate()
// model.findByIdAndRemove()

module.exports = model

