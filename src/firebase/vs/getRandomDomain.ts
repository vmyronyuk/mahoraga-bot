import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { DomainDTO, UserDTO } from '../../dtos/user.dto'
import { getPlayerGrade } from '../../types/domain'
import { db } from '../config'

const cachedDomains: { [key: string]: DomainDTO[] } = {}

export const getRandomDomain = async (userId: string) => {
	const userDocRef = doc(db, 'users', userId)
	const docSnap = await getDoc(userDocRef)

	if (!docSnap.exists()) {
		console.warn('User not found')
		return
	}

	const userData = docSnap.data() as UserDTO
	const userGrade = getPlayerGrade(userData.stats.exp)

	if (cachedDomains[userGrade]) {
		const availableDomains = cachedDomains[userGrade]

		if (availableDomains.length === 0) {
			console.warn(`No domains found for grade: ${userGrade}`)
			return
		}

		const randomDomain =
			availableDomains[Math.floor(Math.random() * availableDomains.length)]

		await updateDoc(userDocRef, { domain: randomDomain, isDomainOpened: true })

		return randomDomain
	}

	const domainsDocRef = doc(db, 'gameData', 'domains')
	const domainsDocSnap = await getDoc(domainsDocRef)

	if (!domainsDocSnap.exists()) {
		console.warn('Domains document not found')
		return
	}

	const domainsData = domainsDocSnap.data()

	const availableDomains: DomainDTO[] = []
	for (const key in domainsData) {
		if (domainsData[key].grade === userGrade) {
			availableDomains.push(domainsData[key] as DomainDTO)
		}
	}

	if (availableDomains.length === 0) {
		console.warn(`No domains found for grade: ${userGrade}`)
		return
	}

	cachedDomains[userGrade] = availableDomains

	const randomDomain =
		availableDomains[Math.floor(Math.random() * availableDomains.length)]

	await updateDoc(userDocRef, { domain: randomDomain, isDomainOpened: true })

	return randomDomain
}
