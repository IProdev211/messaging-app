import { axiosInstance } from '../services/axios';

const logoutReq = async () =>
	await axiosInstance.delete('http://localhost:4000/api/users/logout', {
		withCredentials: true,
	});

const useLogout = () => {
	const logout = async () => {
		await logoutReq();
		localStorage.clear();
		window.location.reload();
	};

	return logout;
};

export default useLogout;
