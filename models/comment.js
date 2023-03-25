const { Model, DataTypes} = require('sequelize');
const sequilize = require('../config/connection');

class Comment extends Model{}

Comment.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_comment:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'user',
            key: 'id'
        }
    },
    comment_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'post',
            key: 'id' 
        }
    }
 },
 {
    sequilize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
 }
 );

 module.exports = Comment;