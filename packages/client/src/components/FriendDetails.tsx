import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import {
	Avatar,
	Button,
	Drawer,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import useUnfriend from '../hooks/useUnfriend';
import friendDetailsOpenState from '../recoil/friendDetailsOpen/atom';
import selectedFriendState from '../recoil/selectedFriend/atom';

const FriendDetails = () => {
	const [selectedFriend, setSelectedFriend] =
		useRecoilState(selectedFriendState);
	const [open, setOpen] = useRecoilState(friendDetailsOpenState);
	const { mutate: unfriend } = useUnfriend();

	const onClick = () => {
		unfriend(selectedFriend?.id);
		setSelectedFriend(null);
	};

	if (!selectedFriend) return null;

	return (
		<Drawer
			sx={{
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: '310px',
					boxSizing: 'border-box',
					mt: { xs: '56px', sm: '64px' },
				},
				textAlign: 'center',
				zIndex: 0,
			}}
			variant='persistent'
			anchor='right'
			open={open}
		>
			<Stack spacing={2} alignItems='center' sx={{ mt: '16px' }}>
				<IconButton onClick={() => setOpen(false)}>
					<ChevronRightIcon />
				</IconButton>
				<Avatar
					src={selectedFriend.avatar}
					sx={{ height: '80px', width: '80px' }}
				/>
				<Typography variant='h5'>{selectedFriend.userName}</Typography>
				<Button variant='contained' color='error' onClick={onClick}>
					Unfriend
				</Button>
			</Stack>
		</Drawer>
	);
};

export default FriendDetails;
