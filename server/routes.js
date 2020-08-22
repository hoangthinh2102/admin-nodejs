const express = require('express')
const router = new express.Router()     

const authHandlers = require('./modules/auth')
const productHandlers = require('./modules/product')
const categoryHandlers = require('./modules/category')


const path = require('path')

const staticPath = path.resolve(__dirname, '../public')

router.use('/', express.static(staticPath))

// ________________________Auth___________________________

router.post('/api/auth/sign-up', authHandlers.signUp)

router.post('/api/auth/sign-in', authHandlers.signIn)

// <dev> only
router.get('/api/auth', authHandlers.findAll)
router.delete('/api/auth/:id', authHandlers.deleteAll)
router.delete('/api/auth', authHandlers.deleteAll)
// </dev>

// _______________________Product___________________________

router.get('/api/product', productHandlers.findMany)

router.get('/api/product/:id', productHandlers.findOne)

router.post('/api/product'
    ,  productHandlers.create)

router.put('/api/product'
    ,  productHandlers.update)

router.delete('/api/product/:id'
    ,  productHandlers.delete)

// ________________________Category___________________________

router.get('/api/category', categoryHandlers.findMany)

router.get('/api/category/:id', categoryHandlers.findOne)

router.post('/api/category'
    , authHandlers.authenticatedMiddleware, categoryHandlers.create)

router.put('/api/category'
    , authHandlers.authenticatedMiddleware, categoryHandlers.update)

router.delete('/api/category/:id'
    , authHandlers.authenticatedMiddleware, categoryHandlers.delete)



module.exports = router