import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Post = sequelize.define('Post', {
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING
    }
});

export default Post;