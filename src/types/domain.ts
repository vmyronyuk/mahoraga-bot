export type PlayerGrade =
	| '4 🔵'
	| '3 🟢'
	| '2 🟡'
	| 'Semi-1 🟠'
	| '1 🔸'
	| 'Special ⚫️'

export function getPlayerGrade(exp: number): PlayerGrade {
	if (exp >= 10_000) return 'Special ⚫️'
	if (exp >= 5_000) return '1 🔸'
	if (exp >= 3_000) return 'Semi-1 🟠'
	if (exp >= 1_000) return '2 🟡'
	if (exp >= 500) return '3 🟢'
	return '4 🔵'
}
