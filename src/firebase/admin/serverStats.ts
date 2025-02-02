import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config'

export const getTotalCoins = async () => {
	const usersRef = collection(db, 'users')
	const querySnapshot = await getDocs(usersRef)

	let totalCoins = 0
	querySnapshot.forEach(doc => {
		const userData = doc.data()
		totalCoins += userData?.balance || 0
	})

	return totalCoins
}
