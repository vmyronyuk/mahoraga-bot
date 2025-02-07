import { Context } from 'telegraf'
import { DomainDTO, UserDTO } from '../../dtos/user.dto'
import { getUserStats } from '../../firebase/user/getUserStats'
import { getRandomDomain } from '../../firebase/vs/getRandomDomain'
import { getMessageInfo } from '../../utils/messageUtils'

export const randomVsCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { userId, username } = messageInfo

	const user = (await getUserStats(userId.toString())) as UserDTO

	if (user.isDomainOpened) {
		await ctx.reply('Ти вже опановував техніку ❌')
		return
	}

	const domainResult = (await getRandomDomain(userId.toString())) as DomainDTO

	const domainMessage = `<b> @${username} </b> успішно опановує техніку <b>${domainResult.name}</b>! ⚡️`

	return ctx.replyWithAnimation(`${domainResult.url}`, {
		caption: domainMessage,
		parse_mode: 'HTML',
	})
}
