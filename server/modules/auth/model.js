const mongoose = require('mongoose')

const UserSchema = require('./schema')
const MODEL_NAME = 'userProfiles'
const COLLECTION_NAME = 'user-profiles'

const model = mongoose.model(
    MODEL_NAME,
    UserSchema,
    COLLECTION_NAME
)

module.exports = model;