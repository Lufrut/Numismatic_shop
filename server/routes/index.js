const Router = require('express')
const router = new Router()
const coinRouter = require('./coinRouter')
const userRouter = require('./userRouter')
const countryRouter = require('./countryRouter')

router.use('/user', userRouter)
router.use('/country', countryRouter)
router.use('/coin', coinRouter)

module.exports = router
