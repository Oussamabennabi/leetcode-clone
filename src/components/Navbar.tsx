'use client';
import Image from 'next/image';
import React from 'react';
import ContactMeButton from './buttons/ContactMeButton';
import LogOutButton from './buttons/LogOutButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { useSetRecoilState } from 'recoil';
import UserIcon from './buttons/UserIcon';
import Link from 'next/link';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TimerButton from './buttons/TimerButton';
import { modalState } from '@/atoms/ModalAtom';
import { problems } from '@/utils/problems'
import { Problem } from '@/utils/types/problem'
import { useParams, useRouter } from 'next/navigation'
type NavbarProps = { problemPage?: boolean;  };
const Navbar: React.FC<NavbarProps> = ({ problemPage }) => {
	const [user] = useAuthState(auth);
	const setAuthModalOpen = useSetRecoilState(modalState);
	function onSignInModalOpen() {
		setAuthModalOpen({
			type: 'sign in',
			open: true,
		});
	}

	const { pid }:any = useParams();
	const router = useRouter()
	function handleProblemChange(isForward: boolean) {

		const { order } = problems[pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find(
			(key) => problems[key].order === nextProblemOrder
		);

		if (isForward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === 1
			);
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		} else {
			router.push(`/problems/${nextProblemKey}`);
		}
	}
	return (
		<nav
			className={`flex justify-between items-center py-0.5 bg-zinc-800 text-white ${
				problemPage ? 'px-4 md:px-4' : 'px-4 md:px-14 '
			} `}
		>
			<Image
				src="/logo-full.png"
				width={100}
				height={100}
				className="cursor-pointer"
				alt="leetcode logo"
			/>

			{problemPage && (
				<div className="flex items-center justify-center gap-2">
					<button
						onClick={() => handleProblemChange(false)}
						className="grid place-items-center  p-1  text-white bg-gray-light hover:bg-zinc-600 rounded-lg transition-all"
					>
						<FaChevronLeft color="white" />
					</button>
					<Link
						className="flex items-center justify-center gap-2 hover:bg-zinc-600 transition-all rounded-lg py-0.5 px-2 "
						href={'/'}
					>
						<AiOutlineUnorderedList />
						Problem List
					</Link>
					<button
						onClick={() => handleProblemChange(true)}
						className="grid place-items-center  p-1  text-white bg-gray-light hover:bg-zinc-600 rounded-lg transition-all"
					>
						<FaChevronRight color="white" />
					</button>
				</div>
			)}

			<div className="flex items-center gap-2">
				<ContactMeButton />
				{user && problemPage && <TimerButton />}
				{!user && (
					<button
						onClick={onSignInModalOpen}
						className="rounded-lg bg-yellow-600  p-1 text-xs font-semibold text-white cursor-pointer transition-all hover:bg-yellow-500"
					>
						<Link href={'/auth'}>Sign In</Link>
					</button>
				)}
				{user && (
					<>
						<LogOutButton />
						<UserIcon />
					</>
				)}
			</div>
		</nav>
	);
};
export default Navbar;
