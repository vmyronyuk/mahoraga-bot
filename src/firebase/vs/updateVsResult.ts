import { doc, increment, updateDoc } from 'firebase/firestore'
import { getTotalCoins } from '../admin/serverStats'
import { db } from '../config'

let cachedTotalCoins: number | null = null

export const updateVsResult = async (
	winnerId: string,
	loserId: string,
	userId: string
) => {
	const winnerRef = doc(db, 'users', winnerId)
	const loserRef = doc(db, 'users', loserId)
	const userRef = doc(db, 'users', userId)

	if (cachedTotalCoins === null) {
		cachedTotalCoins = await getTotalCoins()
	}

	const baseReward = 25
	const serverMultiplier = cachedTotalCoins > 0 ? cachedTotalCoins * 0.001 : 0
	const additionalReward = Math.floor(serverMultiplier)
	const totalReward = baseReward + additionalReward

	await Promise.all([
		updateDoc(winnerRef, {
			'stats.wins': increment(1),
			'stats.exp': increment(25),
			balance: increment(totalReward),
		}),
		updateDoc(loserRef, {
			'stats.loses': increment(1),
			'stats.exp': increment(-5),
		}),
		updateDoc(userRef, { energy: increment(-4) }),
	])
}
