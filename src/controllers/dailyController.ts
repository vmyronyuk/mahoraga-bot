import dayjs from 'dayjs'
import { Context } from 'telegraf'
import { getTotalCoins } from '../firebase/admin/serverStats'
import { getUserStats } from '../firebase/user/getUserStats'
import { updateDaily } from '../firebase/user/updateDaily'
import { getMessageInfo } from '../utils/messageUtils'

let cachedTotalCoins: number | null = null
console.log(cachedTotalCoins)

export const dailyCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { username, userId } = messageInfo

	const user = await getUserStats(userId.toString())

	const lastClaimDate = user?.lastDailyClaim
		? dayjs(user.lastDailyClaim).format('YYYY-MM-DD')
		: null

	const hasClaimedToday = lastClaimDate
		? dayjs(lastClaimDate).isSame(dayjs(), 'day')
		: false

	if (hasClaimedToday) {
		return ctx.reply('Ти вже отримав щоденний бокс ❌')
	}

	if (!cachedTotalCoins) {
		cachedTotalCoins = await getTotalCoins()
	}

	const baseCoinBonus = Math.floor(Math.random() * (250 - 50 + 1)) + 50

	const inflationFactor = Math.min(
		1,
		1 / Math.sqrt(cachedTotalCoins / 1_000_000)
	)

	const finalCoinBonus = Math.max(
		50,
		Math.floor(baseCoinBonus * inflationFactor)
	)

	const energyBonus = Math.floor(Math.random() * (12 - 2 + 1)) + 2

	await updateDaily(
		userId.toString(),
		finalCoinBonus,
		energyBonus,
		dayjs().format('YYYY-MM-DD')
	)

	await ctx.reply(
		`<b> @${username} </b> відкриває щоденний бокс і отримує 📦:\n • ${finalCoinBonus} монет 🪙\n • ${energyBonus} енергії ⚡️`,
		{ parse_mode: 'HTML' }
	)
}
