const uuid = require('uuid')
const path = require('path');
const {Coin, CoinInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class CoinController {
    async create(req, res, next) {
        try {
            let {name, price, country_id,year, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const coin = await Coin.create({name, price, country_id,year, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    CoinInfo.create({
                        title: i.title,
                        description: i.description,
                        coinId: coin.id
                    })
                )
            }

            return res.json(coin)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {country_id, year, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let coins;
        if (!country_id && !year) {
            coins = await Coin.findAndCountAll({limit, offset})
        }
        if (country_id && !year) {
            coins = await Coin.findAndCountAll({where:{country_id}, limit, offset})
        }
        if (!country_id && year) {
            coins = await Coin.findAndCountAll({where:{year}, limit, offset})
        }
        if (country_id && year) {
            coins = await Coin.findAndCountAll({where:{year, country_id}, limit, offset})
        }
        return res.json(coins)
    }

    async getOne(req, res) {
        const {id} = req.params
        const coin = await Coin.findOne(
            {
                where: {id},
                include: [{model: CoinInfo, as: 'info'}]
            },
        )
        return res.json(coin)
    }
}

module.exports = new CoinController()
