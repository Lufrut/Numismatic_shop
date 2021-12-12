const Router = require('express')
const router = new Router()
const coinController = require('../controllers/coinController')

router.post('/', coinController.create)
router.get('/', coinController.getAll)
router.get('/:id', coinController.getOne)

module.exports = router
