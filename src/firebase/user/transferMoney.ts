import { doc, runTransaction } from 'firebase/firestore'
import { UserDTO } from '../../dtos/user.dto'
import { db } from '../config'

export const transferMoney = async (
	senderId: string,
	receiverId: string,
	amount: number
) => {
	if (!senderId || !receiverId || amount <= 0) {
		throw new Error('Invalid transaction parameters')
	}

	if (senderId === receiverId) {
		console.warn('Transaction between the same users. No money transferred.')
	}

	try {
		await runTransaction(db, async transaction => {
			const senderRef = doc(db, 'users', senderId)
			const receiverRef = doc(db, 'users', receiverId)

			const senderSnap = await transaction.get(senderRef)
			const receiverSnap = await transaction.get(receiverRef)

			if (!senderSnap.exists() || !receiverSnap.exists()) {
				throw new Error('User not found')
			}

			const senderData = senderSnap.data() as UserDTO
			const receiverData = receiverSnap.data() as UserDTO

			const senderBalance = senderData.balance || 0
			const receiverBalance = receiverData.balance || 0

			if (senderBalance < amount) {
				throw new Error('Insufficient balance')
			}

			transaction.update(senderRef, { balance: senderBalance - amount })
			transaction.update(receiverRef, { balance: receiverBalance + amount })
		})
	} catch (error) {
		console.error('Error during transferMoney:', error)
	}
}
