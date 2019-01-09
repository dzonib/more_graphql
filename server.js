import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { sequelize } from './config/db'

import { Event } from './models/Event'
import { User } from './models/User'
import { Booking } from './models/Booking'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import isAuth from './middleware/is-auth'


const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ Event, User, Booking, req }) })

const app = express()
app.use(isAuth)
server.applyMiddleware({ app })

User.belongsToMany(Event, { through: Booking })
Event.belongsToMany(User, { through: Booking })
User.hasMany(Event, { foreignKey: 'creatorId', constraints: false })
User.hasMany(Booking)

sequelize.sync().then(() => {
	app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
})
