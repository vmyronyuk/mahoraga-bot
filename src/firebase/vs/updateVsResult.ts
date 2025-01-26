import {
	collection,
	doc,
	getDocs,
	increment,
	updateDoc,
} from 'firebase/firestore'
import { db } from '../config'

let cachedTotalCoins: number | null = null

export const updateVsResult = async (winnerId: string, loserId: string) => {
	const usersRef = collection(db, 'users')
	const winnerRef = doc(db, 'users', winnerId)
	const loserRef = doc(db, 'users', loserId)

	if (cachedTotalCoins === null) {
		const querySnapshot = await getDocs(usersRef)

		let totalCoins = 0
		querySnapshot.forEach(doc => {
			const userData = doc.data()
			totalCoins += userData?.balance || 0
		})

		cachedTotalCoins = totalCoins
	}

	const baseReward = 25
	const serverMultiplier = cachedTotalCoins > 0 ? cachedTotalCoins * 0.001 : 0
	const additionalReward = Math.floor(serverMultiplier)
	const totalReward = baseReward + additionalReward

	await Promise.all([
		updateDoc(winnerRef, {
			'stats.wins': increment(1),
			balance: increment(totalReward),
		}),
		updateDoc(loserRef, { 'stats.loses': increment(1) }),
	])
}
