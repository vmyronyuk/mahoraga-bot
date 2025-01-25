import { doc, getDoc } from 'firebase/firestore'
import { UserDTO } from '../../dtos/user.dto'
import { db } from '../config'

export const getUserStats = async (userId: string): Promise<UserDTO | null> => {
	if (!userId) {
		throw new Error('User ID is required')
	}

	try {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)

		if (!docSnap.exists()) {
			console.warn(`No stats found for user ID: ${userId}`)
			return null
		}

		const userData = docSnap.data() as UserDTO

		return userData
	} catch (error) {
		console.error(error)
		return null
	}
}
