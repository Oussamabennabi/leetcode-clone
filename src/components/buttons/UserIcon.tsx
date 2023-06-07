import { auth } from '@/firebase';
import Image from 'next/image';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type UserIconProps = {};

const UserIcon: React.FC<UserIconProps> = () => {
	const [user] = useAuthState(auth);

	return (
		<div className="group relative">
			<Image src={'/avatar.png'} alt="your photo" width={35} height={35} />
			<span className="rounded-sm p-2 text-yellow-600 group-hover:scale-100 scale-0 transition-all absolute right-0 bg-zinc-800 top-[110%]  text-xs">
				{user?.email}
			</span>
		</div>
	);
};
export default UserIcon;
