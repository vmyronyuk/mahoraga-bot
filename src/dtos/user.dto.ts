export interface UserDTO {
	id: string
	username: string

	domain: DomainDTO
	isDomainOpened: boolean

	balance: number
	profileImage: string

	inventory: InventoryItemDTO[]
	stats: StatDTO
}

export interface InventoryItemDTO {
	itemId: string
	rarity: string
	abilities: string[]
}

export interface StatDTO {
	wins: number
	loses: number
}

export interface DomainDTO {
	id: string
	name: string
	message: string
	url: string
}
