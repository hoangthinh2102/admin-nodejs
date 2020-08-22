const mongoose = require('mongoose')

const schema = require('./schema')
const MODEL_NAME = 'categories'
const COLLECTION_NAME = 'categories'

const model = mongoose.model(
    MODEL_NAME,
    schema,
    COLLECTION_NAME
)


module.exports = model