import { UserDTO } from '../../../dtos/user.dto'
import { updateVsResult } from '../../../firebase/vs/updateVsResult'

export const calcWinner = async (user: UserDTO, targetUser: UserDTO) => {
	const isUserWinner = Math.random() < 0.5
	const winner = isUserWinner ? user : targetUser
	const loser = isUserWinner ? targetUser : user

	await updateVsResult(winner.id, loser.id)

	return winner.username
}
