const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/addCoinToBasket', authMiddleware,userController.addCoinToBasket)
router.post('/editCoinBasketCount', authMiddleware,userController.editCoinBasketCount)
router.get('getBasketContent',authMiddleware,userController.getBasketContent)
router.post('/deleteUserAccount', authMiddleware,userController.deleteUserAccount)
router.post('/changePassword', authMiddleware,userController.changePassword)

module.exports = router
