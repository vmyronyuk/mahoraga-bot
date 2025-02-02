import { PlayerGrade } from '../types/domain'

export interface UserDTO {
	id: string
	username: string

	domain: DomainDTO
	isDomainOpened: boolean

	balance: number
	energy: number

	profileImage: string

	inventory: InventoryItemDTO[]
	stats: StatDTO

	lastDailyClaim: string | null
}

export interface InventoryItemDTO {
	itemId: string
	rarity: string
	abilities: string[]
}

export interface StatDTO {
	wins: number
	loses: number
	exp: number
}

export interface DomainDTO {
	id: string
	name: string
	message: string
	url: string
	grade: PlayerGrade
}
