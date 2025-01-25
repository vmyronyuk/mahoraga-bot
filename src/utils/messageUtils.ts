import { Context } from 'telegraf'

interface MessageInfo {
	userId: number
	username: string
	text: string
}

const isTextMessage = (message: any): message is { text: string } => {
	return message && typeof message.text === 'string'
}

export const getMessageInfo = (ctx: Context): MessageInfo | null => {
	if (!ctx.message) {
		return null
	}

	if (isTextMessage(ctx.message)) {
		const { from, text } = ctx.message
		return {
			userId: from.id,
			username: from.username || 'Unknown',
			text,
		}
	}

	const { from } = ctx.message
	return {
		userId: from.id,
		username: from.username || 'Unknown',
		text: '',
	}
}
