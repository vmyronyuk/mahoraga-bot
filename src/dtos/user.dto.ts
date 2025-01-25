export interface UserDTO {
	username: string
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
