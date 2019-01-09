import { gql } from 'apollo-server-express'


export default gql`
    type Query {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createEvent(data: EventInput): Event
        createUser(data: UserInput): User
        bookEvent(eventId: ID!): Boolean!
        cancelBooking(bookingId: ID!): Event!
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creatorId: Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type User {
        id: ID!
        email: String!
        name: String
        password: String
    }

    type Booking {
        id: ID
        event: Event
        creator: User
        createdAt: String
        updatedAt: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        email: String!
        name: String
        password: String!
    }
`