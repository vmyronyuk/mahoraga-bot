import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../config'

export const updateDaily = async (
	userId: string,
	coins: number,
	energy: number,
	date: string | null
) => {
	const userRef = doc(db, 'users', userId)

	await updateDoc(userRef, {
		balance: increment(coins),
		energy: increment(energy),
		lastDailyClaim: date,
	})
}
