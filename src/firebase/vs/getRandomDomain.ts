import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { DomainDTO } from '../../dtos/user.dto'
import { db } from '../config'

export const getRandomDomain = async (userId: string) => {
	const domainsDocRef = doc(db, 'gameData', 'domains')
	const domainsDocSnap = await getDoc(domainsDocRef)

	if (!domainsDocSnap.exists()) {
		console.warn('Domains document not found')
		return
	}

	const domainsData = domainsDocSnap.data()

	const domainKeys = Object.keys(domainsData)
	const randomDomainKey =
		domainKeys[Math.floor(Math.random() * domainKeys.length)]

	const randomDomain = domainsData[randomDomainKey] as DomainDTO

	const userDocRef = doc(db, 'users', userId)
	const docSnap = await getDoc(userDocRef)

	if (!docSnap.exists()) {
		return console.warn('User not found')
	}

	await updateDoc(userDocRef, { domain: randomDomain, isDomainOpened: true })

	return randomDomain
}
