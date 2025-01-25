import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config()

const botToken = process.env.BOT_TOKEN

if (!botToken) {
	throw new Error('BOT_TOKEN is not defined')
}

const bot = new Telegraf(botToken)

bot.start(async ctx => {
	const userId = ctx.message.from.id
	const username = ctx.message.from.username
	await ctx.reply(`${username} ID ${userId}`)
})

bot
	.launch()
	.then(() => {
		console.log('Bot is up and running!')
	})
	.catch(err => {
		console.error('Error launching bot:', err)
	})
