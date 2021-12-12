const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER,allowNull: false},
})

const BasketCoin = sequelize.define('basket_coin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    basketId: {type: DataTypes.INTEGER,allowNull: false},
    coinId: {type: DataTypes.INTEGER,allowNull: false},
    count: {type: DataTypes.INTEGER,allowNull: false},
})

const Coin = sequelize.define('coin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    country_id:{type: DataTypes.INTEGER, allowNull: false},
    year:{type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const CoinInfo = sequelize.define('coin_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    coinId: {type: DataTypes.INTEGER, allowNull: false},
})


User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketCoin)
BasketCoin.belongsTo(Basket)

Coin.hasMany(BasketCoin)
BasketCoin.belongsTo(Coin)

Country.hasMany(Coin)
Coin.belongsTo(Country)

Coin.hasMany(CoinInfo, {as: 'info'});
CoinInfo.belongsTo(Coin)


module.exports = {
    User,
    Basket,
    BasketCoin,
    Coin,
    CoinInfo
}





