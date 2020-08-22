const mongoose = require('mongoose')
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(value){
                return EMAIL_REGEX.test(value)
                // return true|false|throw Error('message error')
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthdate: Date,
    state: {
        type: String,
        required: true,
        enum: ['available', 'disable']      // set value only this array
    }
})


module.exports = schema;