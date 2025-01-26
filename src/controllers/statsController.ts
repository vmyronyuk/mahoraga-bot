import { Context } from 'telegraf'
import { getUserStats } from '../firebase/user/getUserStats'
import { calculateKD } from '../utils/calculateKd'
import { getMessageInfo } from '../utils/messageUtils'

export const statsCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { userId } = messageInfo

	const userStats = await getUserStats(userId.toString())

	if (!userStats) {
		return ctx.reply(`<b>Статистика не знайдена</b>.`, { parse_mode: 'HTML' })
	}

	const totalGames = userStats.stats.wins + userStats.stats.loses

	const responseMessage = `
<b>@${userStats.username}</b>
────────────
⚔️ <b>Територія:</b> ${userStats.domain.name}
💰 <b>Баланс:</b> ${userStats.balance} монет
────────────
📊 <b>Статистика:</b>

❇️ <b>Виграші:</b> ${userStats.stats.wins}
⛔ <b>Поразки:</b> ${userStats.stats.loses}
✖️ <b>Всього ігор:</b> ${totalGames}
────────────
🗡 <b>K/D:</b> ${calculateKD(userStats.stats.wins, userStats.stats.loses)}
────────────
`

	return await ctx.reply(responseMessage, { parse_mode: 'HTML' })
}
