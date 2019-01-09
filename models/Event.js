	import Sequelize from 'sequelize'
	import { sequelize } from '../config/db'

	export const Event = sequelize.define('event', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		date: {
			type: Sequelize.DATE
		}
	})
