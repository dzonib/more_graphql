import Sequelize from 'sequelize'
import { sequelize } from '../config/db'


export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
