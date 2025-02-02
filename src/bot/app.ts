import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import { dailyCommandHandler } from '../controllers/dailyController'
import { payCommandHandler } from '../controllers/payContoller'
import { startCommandHandler } from '../controllers/startController'
import { statsCommandHandler } from '../controllers/statsController'
import { randomVsCommandHandler } from '../controllers/vs/randomVsController'
import { vsCommandHandler } from '../controllers/vs/vsContoller'

dotenv.config()

const botToken = process.env.BOT_TOKEN

if (!botToken) {
	throw new Error('BOT_TOKEN is not defined')
}

const bot = new Telegraf(botToken)

bot.start(startCommandHandler)

bot.command('stats', statsCommandHandler)
bot.command('pay', payCommandHandler)
bot.command('daily', dailyCommandHandler)

bot.command('vs', vsCommandHandler)
bot.command('randomVs', randomVsCommandHandler)

bot
	.launch()
	.then(() => {
		console.log('Bot is up and running!')
	})
	.catch(err => {
		console.error('Error launching bot:', err)
	})
