import { Context } from 'telegraf'
import { UserDTO } from '../dtos/user.dto'
import { getUserStats } from '../firebase/user/getUserStats'
import { getPlayerGrade } from '../types/domain'
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

	const userDefaultValues = {
		id: '0',
		username: 'Unknown',
		domain: { id: '', name: '/randomVs', message: '', url: '', grade: '4 🔵' },
		isDomainOpened: false,
		balance: 0,
		energy: 0,
		profileImage: '',
		inventory: [],
		stats: {
			wins: 0,
			loses: 0,
			exp: 0,
		},
		lastDailyClaim: null,
	} satisfies UserDTO

	const domainName = userStats.domain?.name || '/randomVs'

	const totalGames = userStats.stats.wins + userStats.stats.loses

	const userRang = getPlayerGrade(
		userStats.stats.exp || userDefaultValues.stats.exp
	)

	const responseMessage = `
<b>@${userStats.username || userDefaultValues.username}</b>
🔮 <b>Grade: ${userRang}</b>
────────────
⚔️ <b>Техніка:</b> ${domainName || '/randomVs'}
💰 <b>Баланс:</b> ${userStats.balance || userDefaultValues.balance}
⚡️ <b>Енергія:</b> ${userStats.energy || userDefaultValues.energy}
────────────
📊 <b>Статистика:</b>

❇️ <b>Виграші:</b> ${userStats.stats.wins || userDefaultValues.stats.wins}
⛔ <b>Поразки:</b> ${userStats.stats.loses || userDefaultValues.stats.loses}
✖️ <b>Всього ігор:</b> ${totalGames || 0}
────────────
🗡 <b>K/D:</b> ${calculateKD(userStats.stats.wins, userStats.stats.loses)}
────────────
`

	return await ctx.reply(responseMessage, { parse_mode: 'HTML' })
}
