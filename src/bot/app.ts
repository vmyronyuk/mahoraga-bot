import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import { startCommandHandler } from '../controllers/startController'

dotenv.config()

const botToken = process.env.BOT_TOKEN

if (!botToken) {
	throw new Error('BOT_TOKEN is not defined')
}

const bot = new Telegraf(botToken)

bot.start(startCommandHandler)

bot
	.launch()
	.then(() => {
		console.log('Bot is up and running!')
	})
	.catch(err => {
		console.error('Error launching bot:', err)
	})
