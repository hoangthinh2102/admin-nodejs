const userModel = require('./model')
const {
    hashMd5,
    signToken,
    verifyToken
} = require('../utils')

const handlers = {
    async signIn(req, res, next) {
        try {
            let data = req.body
            let { email, password } = data

            if (!email) {
                throw new Error(`Missing 'email'!`)
            }

            if (!password) {
                throw new Error(`Missing 'password'!`)
            }

            let formattedEmail = String(email).trim().toLowerCase()
            let hashedPassword = hashMd5(String(password))

            let user = await userModel.findOne({ email: formattedEmail })
            if (!user) {
                throw new Error(`Invalid 'email' or 'password'!`)
            }
            if (user.password != hashedPassword) {
                throw new Error(`Invalid 'email' or 'password'!`)
            }

            let userData = user.toObject()
            delete userData.password

            let accessToken = signToken(userData)
            userData.accessToken = accessToken

            res.json(userData)

        } catch (err) {
            next(err)
        }
    },
    async signUp(req, res, next) {
        try {
            let data = req.body

            if (typeof data.password != 'string'
                || !(data.password.length >= 6 && data.password.length <= 30)) {
                throw new Error('Invalid password! Password length should be between 6 and 30!')
            }

            data.password = hashMd5(data.password)
            data.email = String(data.email).toLowerCase().trim()
            data.state = 'available'
            let user = await userModel.create(data)
            let userData = user.toObject()          // user is mongoose document

            delete userData.password

            res.json(userData)
        } catch (err) {
            next(err)
        }
    },
    async readTokenMiddleware(req, res, next) {
        try {
            let accessToken = req.headers.authorization
            if (accessToken) {
                let userData = verifyToken(accessToken)
                req.user = userData
            }
            next()
        } catch (err) {
            next(new Error('Invalid access token!'))
        }       
    },
    async authenticatedMiddleware(req, res, next) {
        try {
            let user = req.user
            if(!user || !user._id){
                throw new Error('Unauthenticated!')
            }
            next()
        } catch (err) {
            next(err)
        }
    },
    // dev only
    async findAll(req, res, next) {
        try {
            let items = await userModel.find({})
            res.json(items)
        } catch (err) {
            next(err)
        }
    },
    async deleteAll(req, res, next) {
        try {
            let id = req.params.id
            if (id) {
                await userModel.findByIdAndDelete(id)
            } else {
                await userModel.deleteMany({})
            }
            res.json([])
        } catch (err) {
            next(err)
        }
    }
}




module.exports = handlers;