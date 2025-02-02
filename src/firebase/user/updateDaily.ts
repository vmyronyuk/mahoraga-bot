import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../config'

export const updateDaily = async (
	userId: string,
	coins: number,
	energy: number,
	exp: number,
	date: string | null
) => {
	const userRef = doc(db, 'users', userId)

	await updateDoc(userRef, {
		balance: increment(coins),
		energy: increment(energy),
		'stats.exp': increment(exp),
		lastDailyClaim: date,
	})
}
