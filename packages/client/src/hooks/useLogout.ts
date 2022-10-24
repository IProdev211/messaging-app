import { useRecoilValue, useResetRecoilState } from 'recoil';
import { queryClient } from '..';
import currentUserState from '../recoil/currentUser/atom';
import friendDetailsOpenState from '../recoil/friendDetailsOpen/atom';
import selectedFriendState from '../recoil/selectedFriend/atom';
import webSocketState from '../recoil/webSocket/atom';
import { axiosInstance } from '../services/axios';

const logoutReq = async () =>
	await axiosInstance.delete('http://localhost:4000/api/users/logout', {
		withCredentials: true,
	});

const useLogout = () => {
	const resetFriendDetailsOpenState = useResetRecoilState(
		friendDetailsOpenState
	);
	const resetSelectedFriendState = useResetRecoilState(selectedFriendState);
	const resetCurrentUserState = useResetRecoilState(currentUserState);
	const socket = useRecoilValue(webSocketState);

	const logout = () => {
		logoutReq();
		socket?.close();
		resetCurrentUserState();
		resetFriendDetailsOpenState();
		resetSelectedFriendState();
		axiosInstance.defaults.headers.common['csrf-token'] = '';
		queryClient.clear();
	};

	return logout;
};

export default useLogout;
