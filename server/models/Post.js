const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Post extends Model {}
Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    publication: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Post'
    }
)

module.exports = Post;