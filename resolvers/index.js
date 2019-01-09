import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
	Query: {
		async events(parent, args, { Event }, info) {
			const events = await Event.findAll()

			return events
		},
		async bookings(parent, args, { Booking, User, req }, info) {
			if (!req.isAuth) {
				throw new Error('Unauthenticated!')
			}
			try {
				const user = await User.findByPk(1)
				const bookings = await user.getEvents()
				return bookings
			} catch (e) {
				console.log(e.message)
			}
		},
		async login(parent, { email, password }, { User }, info) {
			const user = await User.findOne({ where: { email: email } })

			if (!user) {
				throw new Error('User does not exist')
			}

			const passCheck = await bcrypt.compare(password, user.password)

			if (!passCheck) {
				throw new Error('Wrong password!')
			}

			const token = jwt.sign({ userId: user.id, email: user.email }, 'yosecretyo', { expiresIn: '1h' })

			return { userId: user.id, token, tokenExpiration: 1 }
		}
	},
	Mutation: {
		async createEvent(parent, { data }, { Event, req }, info) {

			if (!req.isAuth) {
				throw new Error('Unauthenthicated!')
			}

			try {
				const event = await Event.create({
					title: data.title,
					description: data.description,
					price: data.price,
					date: new Date(data.date),
					creatorId: req.userId
				})

				return event
			} catch (e) {
				console.log(e.message)
			}
		},
		async createUser(parent, { data }, { User }, info) {
			const { name, email, password } = data

			const userCheck = await User.findOne({ where: { email } })
			if (userCheck) {
				throw new Error('User registered yo')
			}

			const hashedPassword = await bcrypt.hash(password, 10)

			const user = await User.create({
				name,
				email,
				password: hashedPassword
			})

			return user
		},

		async bookEvent(parent, { eventId }, { User, Event, req }, info) {

			if (!req.userId) {
				throw new Error('User not authenticated')
			}

			try {
				const user = await User.findByPk(req.userId)
				const event = await Event.findByPk(eventId)
				console.log(JSON.stringify(user, null, 4))
				const bookingYo = await user.addEvent(event)

				// const test = await user.getEvents({where: {id: eventId}})

				// console.log(JSON.stringify(test, null, 4))
				if (bookingYo.length > 0) {
					return true
				} else {
					return false
				}
			} catch (e) {
				console.log(e.message)
			}
		},
		async cancelBooking(parent, { bookingId }, { Booking, Event, req }) {

			if (!req.isAuth) {
				throw new Error('Unauthenticated')
			}

			const booking = await Booking.findByPk(bookingId)

			console.log(JSON.stringify(booking, null, 4))
			const eventKey = booking.eventId

			booking.destroy()
			return Event.findByPk(eventKey)
		}
	},
	Booking: {
		creator: async (parent, args, { User }) => {
			const creator = User.findByPk(parent.creatorId)
			return creator
		},
		event: async (parent, args, { Event }) => {
			const event = await Event.findByPk(parent.id)
			return event
		}
	}
}
