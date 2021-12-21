const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, BasketCoin, Coin} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async addCoinToBasket(req, res, next) {
        const {coinId} = req.body
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        const checkCoinInBasket = await BasketCoin.findOne({where: {coinId, basketId: basket.id}})
        if (checkCoinInBasket) {
            return next(ApiError.badRequest("Товар уже в корзине!"))
        }
        await BasketCoin.create({
            basketId: basket.id,
            coinId,
            count: 1,
        })
    }

    async editCoinBasketCount(req, res, next) {
        const {coinId, count} = req.body
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        const coinBasket = await BasketCoin.findOne({where: {coinId, basketId: basket.id}})
        if (!coinBasket) {
            return next(ApiError.badRequest("Товар уже в корзине!"))
        }
        await BasketCoin.update({count}, {where: {id}})
        return res.statusCode(200);
    }

    async getBasketContent(req, res, next) {
        let {limit, page} = req.query
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        const coinBasket = await BasketCoin.findOne({where: {basketId: basket.id}})
        if (!coinBasket) {
            return next(ApiError.badRequest("Товар уже в корзине!"))
        }
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        const content = await BasketCoin.findAndCountAll({where: {basketId: basket.id}, limit, offset})
        return res.json(content)
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    async deleteUserAccount(req,res){
        const {id} = req.user
        await User.destroy({
            where: {id: id}
        })
    }
    async changePassword(req, res,next) {
        const {password,old_password} = req.body
        const {id} = req.user
        const old_hash_password = await bcrypt.hash(old_password,5)
        const user = await User.findOne({where:{id:id,password:old_hash_password}})
        if(!user){
            next(ApiError.badRequest("Password is wrong"))
        }
        const hash_password = await bcrypt.hash(password,5)
        await User.update(
            {
                password:hash_password
            },
            {
                where: {id: id}
            })
        return res.status(200).json("OK");
    }
}
module.exports = new UserController()
