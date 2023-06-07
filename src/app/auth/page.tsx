'use client';

import AuthModal from '@/components/Modals/AuthModal';

import Image from 'next/image';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { modalState } from '@/atoms/ModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
	const setAuthModalOpen = useSetRecoilState(modalState);
	const [loadingPage, setLoadingPage] = useState(true);
	function onSignInModalOpen() {
		setAuthModalOpen({
			type: 'sign in',
			open: true,
		});
	}
	const [user, loading, error] = useAuthState(auth);
	const router = useRouter();
	useEffect(() => {
		if (user) {
			router.push('/');
		}
		// if(!loading && !user)
		// setLoadingPage(false)
	}, [user]);
	// if (loadingPage) return null;
	return (
		<div className="container  flex flex-col  h-screen mx-auto px-4">
			<div className="flex justify-between items-center mt-4">
				<Link href={'/'}>
					<Image
						src={'/logo-full.png'}
						alt="leetcode"
						width={100}
						height={100}
						className="cursor-pointer"
					/>
				</Link>
				<button
					onClick={onSignInModalOpen}
					className="rounded-sm bg-yellow-500 px-4 p-2 text-white cursor-pointer transition-all hover:bg-yellow-400"
				>
					Sign In
				</button>
			</div>
			<div className=" ">
				<Image
					className="mx-auto"
					src={'/hero.png'}
					alt="leetcode"
					fill
					style={{ objectFit: 'contain', maxWidth: '1036px', zIndex: -1 }}
				/>
			</div>
			{/* MODALS */}

			<AuthModal />
		</div>
	);
};
export default AuthPage;
