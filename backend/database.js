import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('georgio_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;