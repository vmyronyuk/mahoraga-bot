import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../config'

export const getUserIdByUsername = async (
	username: string
): Promise<string | null> => {
	if (!username) {
		throw new Error('Username is required')
	}

	try {
		const usersRef = collection(db, 'users')
		const q = query(usersRef, where('username', '==', username))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			console.warn(`User with username "${username}" not found`)
			return null
		}

		return querySnapshot.docs[0].id
	} catch (error) {
		console.error('Error fetching user ID:', error)
		return null
	}
}
