import { doc, getDoc, setDoc } from 'firebase/firestore'
import { Context } from 'telegraf'
import { UserDTO } from '../dtos/user.dto'
import { db } from '../firebase/config'
import { getMessageInfo } from '../utils/messageUtils'

export const startCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { userId, username } = messageInfo

	const newUser = {
		id: userId.toString(),
		username: username,
		domain: { id: '', name: '/randomVs', message: '', url: '', grade: '4 🔵' },
		isDomainOpened: false,
		balance: 0,
		energy: 20,
		profileImage: '',
		inventory: [],
		stats: {
			wins: 0,
			loses: 0,
			exp: 0,
		},
		lastDailyClaim: null,
	} satisfies UserDTO

	const userRef = doc(db, 'users', userId.toString())
	const docSnap = await getDoc(userRef)

	if (docSnap.exists()) {
		return
	} else {
		try {
			await setDoc(userRef, newUser)
			return ctx.reply(`@${username} приєднується до битви! ⚔️`)
		} catch (error) {
			console.error('Error creating new user: ', error)
			return ctx.reply('Помилка створення нового користувача')
		}
	}
}
