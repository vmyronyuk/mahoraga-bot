import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../config'

export const updateVsResult = async (winnerId: string, loserId: string) => {
	const winnerRef = doc(db, 'users', winnerId)
	const loserRef = doc(db, 'users', loserId)

	await Promise.all([
		updateDoc(winnerRef, { 'stats.wins': increment(1) }),
		updateDoc(loserRef, { 'stats.loses': increment(1) }),
	])
}
