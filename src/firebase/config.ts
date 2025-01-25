import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCX7GLE8utkQwEqCBr94AaMPk7gj5zaLbU',
	authDomain: 'mahoraga-bot.firebaseapp.com',
	projectId: 'mahoraga-bot',
	storageBucket: 'mahoraga-bot.firebasestorage.app',
	messagingSenderId: '208434732887',
	appId: '1:208434732887:web:9780cf5bbe177212a8e812',
	measurementId: 'G-TMG2Q7HQ81',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
