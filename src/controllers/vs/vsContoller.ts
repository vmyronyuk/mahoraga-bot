import { Context } from 'telegraf'
import { UserDTO } from '../../dtos/user.dto'
import { getUserStats } from '../../firebase/user/getUserStats'
import { getRandomUser } from '../../firebase/vs/getRandomUser'
import { getMessageInfo } from '../../utils/messageUtils'
import { calcWinner } from './utils/calcWinner'

export const vsCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { username, userId } = messageInfo

	try {
		const currentUser = (await getUserStats(userId.toString())) as UserDTO
		const targetUser = (await getRandomUser(userId.toString())) as UserDTO

		if (!currentUser || !targetUser) {
			return ctx.reply('Не вдалося знайти одного з користувачів.')
		}

		if (!currentUser.domain.id) {
			await ctx.reply('Слабака без території ніхто не помічає 😭')
			return
		}

		if (currentUser.energy - 4 < 0) {
			await ctx.reply('Недостатньо енергії для виклику ⚡️❌')
			return
		}

		const winner = await calcWinner(currentUser, targetUser)

		await ctx.replyWithAnimation(`${currentUser.domain.url}`, {
			caption: `🔊 <b> @${username} кидає виклик і @${targetUser.username} приймає! </b>\n\n${currentUser.domain.message} ${currentUser.domain.name}\n\nПереміг - <b>@${winner}</b>`,
			parse_mode: 'HTML',
		})
	} catch (error) {
		console.error('Error during vsCommandHandler:', error)
		return ctx.reply('Сталася помилка при обробці запиту. Спробуйте ще раз.')
	}
}
