'use client';
import { auth } from '@/firebase';
import { FaSignOutAlt } from 'react-icons/fa';
import React from 'react';
import {toast} from 'react-toastify';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { toastOptions } from '../toast'

type LogOutButtonProps = {};

const LogOutButton: React.FC<LogOutButtonProps> = () => {
	const [user] = useAuthState(auth);
	const [signOut, loading, error] = useSignOut(auth);

	async function onLogOut() {
		try {
			const success = await signOut();
			if (success) {
				toast.success("Signed Out successfully",toastOptions as any)
			}
		} catch (error) {
				toast.error('Signed Out was not successfull', toastOptions as any);
		}
	}

	return (
		<button
			onClick={onLogOut}
			disabled={loading}
			className="rounded-lg bg-yellow-600  hover:bg-yellow-500 transition-all p-1.5"
		>
			<FaSignOutAlt />
		</button>
	);
};
export default LogOutButton;
