const express = require('express')

const Router = express()

Router.use('/api/user',require('./userRoutes'))
Router.use('/api/pet',require('./petRoutes'))
Router.use('/api/session',require('./sessionRoutes'))

module.exports=Router