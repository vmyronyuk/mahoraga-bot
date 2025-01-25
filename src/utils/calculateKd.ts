export const calculateKD = (wins: number, losses: number): string => {
	if (losses === 0 && wins === 0) {
		return '0'
	}
	const kd = wins / (losses || 1)
	return kd.toFixed(2)
}
