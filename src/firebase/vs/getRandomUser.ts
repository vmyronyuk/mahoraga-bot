import { collection, getDocs } from 'firebase/firestore'
import { UserDTO } from '../../dtos/user.dto'
import { db } from '../config'

export const getRandomUser = async (
	currentUserId: string
): Promise<UserDTO | null> => {
	const usersRef = collection(db, 'users')
	const querySnapshot = await getDocs(usersRef)

	if (querySnapshot.empty) {
		console.warn('No users found in the database.')
		return null
	}

	const users = querySnapshot.docs
		.map(doc => {
			const data = doc.data() as UserDTO
			return {
				...data,
				id: doc.id,
			}
		})
		.filter(user => user.id !== currentUserId)

	if (users.length === 0) {
		console.warn('No other users available to choose from.')
		return null
	}

	const randomUser = users[Math.floor(Math.random() * users.length)]

	return randomUser
}
