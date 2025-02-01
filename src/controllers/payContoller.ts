import { Context } from 'telegraf'
import { getUserIdByUsername } from '../firebase/user/gerUserId'
import { getUserStats } from '../firebase/user/getUserStats'
import { transferMoney } from '../firebase/user/transferMoney'
import { getMessageInfo } from '../utils/messageUtils'

export const payCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { userId, username, text } = messageInfo
	const args = text.split(' ')

	if (args.length < 3) {
		return ctx.reply(
			'<code>Неправильний формат команди ❌\b /pay <сума> @user</code>',
			{ parse_mode: 'HTML' }
		)
	}

	const amount = Number(args[1])
	const targetUsername = args[2]?.replace('@', '')

	const targetUsernameId = await getUserIdByUsername(targetUsername)

	if (isNaN(amount) || amount <= 0) {
		return ctx.reply('Некоректна сума переказу ❌')
	}

	const senderStats = await getUserStats(userId.toString())

	if (!senderStats) {
		return ctx.reply('Акаунт не знайдено ❌')
	}

	if (!targetUsernameId) {
		return ctx.reply('Цільового користувача не знайдено ❌')
	}

	if (senderStats.balance < amount) {
		return ctx.reply('Недостатньо монет на балансі ❌')
	} else if (amount < 100) {
		return ctx.reply('Мінімальна сума переказу 100 монет ❌')
	} else {
		await transferMoney(userId.toString(), targetUsernameId.toString(), amount)
		await ctx.reply(
			`@${username} передає @${targetUsername} ${amount} монет 💰✅`
		)
	}
}
