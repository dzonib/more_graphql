import Sequelize from 'sequelize'
export const sequelize = new Sequelize('postgres://dzonib:123456@localhost:5433/graphql_events')
