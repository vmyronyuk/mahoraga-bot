import { Context } from 'telegraf'
import { DomainDTO } from '../../dtos/user.dto'
import { getRandomDomain } from '../../firebase/vs/getRandomDomain'
import { getMessageInfo } from '../../utils/messageUtils'

export const randomVsCommandHandler = async (ctx: Context) => {
	const messageInfo = getMessageInfo(ctx)

	if (!messageInfo) {
		return ctx.reply('Повідомлення не відповідає формату')
	}

	const { userId, username } = messageInfo

	const domainResult = (await getRandomDomain(userId.toString())) as DomainDTO

	const domainMessage = `<b> @${username} </b> успішно опановує територію <b>${domainResult.name}</b>! ⚡️`

	return ctx.replyWithAnimation(`${domainResult.url}`, {
		caption: domainMessage,
		parse_mode: 'HTML',
	})
}
