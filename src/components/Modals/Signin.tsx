import { modalState } from '@/atoms/ModalAtom';
import { auth } from '@/firebase';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { toastOptions } from '../toast';
type SigninProps = {};

const Signin: React.FC<SigninProps> = () => {
	const setModal = useSetRecoilState(modalState);
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	function onSignUpModalOpen() {
		setModal({ type: 'sign up', open: true });
	}
	function onPasswordResetModalOpen() {
		setModal({ type: 'reset password', open: true });
	}
	async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const user = await signInWithEmailAndPassword(
				inputs.email,
				inputs.password
			);
			if (!user) {
				toast.error('sign in Failed', toastOptions as any);

				return;
			}
			toast.success('Signed in successfully', toastOptions as any);
		} catch (error) {}
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(e.target.value);
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		// setErrors({ email: '', password: '', displayName: '' });
	}
	return (
		<form className=" my-4" onSubmit={handleSignIn}>
			<div className="flex flex-col justify-between items-center gap-3">
				<label>
					<span className="text-xs">Your Email</span>
					<input
						type="email"
						className="w-full h-10 px-2 rounded-sm outline-none border border-black text-black"
						placeholder="joe@gmail.com"
						name="email"
						value={inputs.email}
						onChange={onChange}
					/>
				</label>
				<label>
					<span className="text-xs">Your Password</span>
					<input
						type="password"
						className="w-full h-10 px-2 rounded-sm outline-none border border-black text-black"
						placeholder="****"
						value={inputs.password}
						onChange={onChange}
						name="password"
					/>
				</label>
				<button
					type="submit"
					className="w-full h-10 mt-3 rounded-sm bg-yellow-600 hover:bg-yellow-500 transition-all"
				>
					{loading ? 'Log In...' : 'Log In'}
				</button>
				<button
					onClick={onPasswordResetModalOpen}
					className="text-yellow-700 text-xs "
				>
					Forgot your password?
				</button>
				<div className="text-xs">
					<span className="text-[13px]">Not Registered Yet !</span>
					<button onClick={onSignUpModalOpen} className="ml-1 text-yellow-700 ">
						Create Account
					</button>
				</div>
			</div>
		</form>
	);
};
export default Signin;
