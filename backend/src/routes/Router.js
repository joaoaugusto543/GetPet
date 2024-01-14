const express = require('express')

const Router = express()

Router.use('/api/hello',require('./helloRoutes'))

module.exports=Router