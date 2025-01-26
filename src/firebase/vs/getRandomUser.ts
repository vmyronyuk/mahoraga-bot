import { collection, getDocs, query, where } from 'firebase/firestore'
import { UserDTO } from '../../dtos/user.dto'
import { db } from '../config'

let cachedUsers: UserDTO[] | null = null

export const getRandomUser = async (
	currentUserId: string
): Promise<UserDTO | null> => {
	if (cachedUsers) {
		const filteredUsers = (cachedUsers as UserDTO[]).filter(
			user => user.id !== currentUserId
		)
		return getRandomFromArray(filteredUsers)
	}

	const usersRef = collection(db, 'users')
	const querySnapshot = await getDocs(
		query(usersRef, where('id', '!=', currentUserId))
	)

	if (querySnapshot.empty) {
		console.warn('No users found in the database.')
		return null
	}

	cachedUsers = querySnapshot.docs.map(doc => ({
		...(doc.data() as UserDTO),
		id: doc.id,
	}))

	return getRandomFromArray(cachedUsers)
}

const getRandomFromArray = (users: UserDTO[]): UserDTO | null => {
	if (users.length === 0) {
		console.warn('No users available to choose from.')
		return null
	}

	const randomUser = users[Math.floor(Math.random() * users.length)]
	return randomUser
}
