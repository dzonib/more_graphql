import Sequelize from 'sequelize'
import { sequelize } from '../config/db'

export const Booking = sequelize.define('booking', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	}
})
