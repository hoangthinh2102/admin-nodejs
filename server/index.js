require('./connect-mongo')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 8000
// set PORT = 8999 && node server
// install npm i -g cross-env
// cross-env PORT=9000  node server
// console.log(process.env);
const routes = require('./routes')
const { readTokenMiddleware, authenticatedMiddleware } = require('./modules/auth')

app.use(bodyParser.json())
app.use(session({
    secret: 'my secret string',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 12 * 60 * 60 }   // 12 hours
}))
app.use(readTokenMiddleware)

// app.get(
//     '/not-require-token',
//     (req, res) => res.send('Success!'))

// app.get(
//     '/require-token',
//     authenticatedMiddleware,
//     (req, res) => res.send('Success!'))

// app.get('/test', (req, res) => {
//     res.json(req.user)
// })

app.use(routes)

app.use((err, req, res, next) => {
    res.status(500)
        .json({
            message: err.message,
            stack: err.stack
        })
})


app.listen(port, (err) => {
    console.log(err || `Server is running at port '${port}'`);
})