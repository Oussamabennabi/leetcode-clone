import { modalState } from '@/atoms/ModalAtom';
import { toast } from 'react-toastify';
import React, { ReactEventHandler, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { toastOptions } from '../toast';
import { doc, setDoc } from 'firebase/firestore';
type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
	const setModal = useSetRecoilState(modalState);
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		displayName: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		displayName: '',
	});
	const router = useRouter();
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	function onSignInModalOpen() {
		setModal({ type: 'sign in', open: true });
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setErrors({ email: '', password: '', displayName: '' });
	}
	function validateSignUp(): boolean {
		const { email, password, displayName } = inputs;
		interface Errors {
			email?: string;
			displayName?: string;
			password?: string;
		}
		const errors: Errors = {};

		if (!email) {
			errors.email = 'You must include your email';
		}

		if (!displayName) {
			errors.displayName = 'You must choose a display name';
		}

		if (!password) {
			errors.password = 'You must include a password';
		}

		setErrors((prev) => ({ ...prev, ...errors }));

		return Object.keys(errors).length === 0;
	}
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (validateSignUp()) {
			try {
				toast.loading('Creating your account', {
					position: 'top-center',
					toastId: 'loadingToast',
					theme: 'dark',
				});

				const newUser = await createUserWithEmailAndPassword(
					inputs.email,
					inputs.password
				);

				if (!newUser) {
					// set error message
					toast.error(
						'Signed up was not successfully done',
						toastOptions as any
					);

					return;
				}
				const userData = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					displayName: inputs.displayName,
					createdAt: Date.now(),
					updatedAt: Date.now(),
					likedProblems: [],
					dislikedProblems: [],
					solvedProblems: [],
					starredProblems: [],
				};
				await setDoc(doc(firestore, 'users', newUser.user.uid), userData);
				toast.success('Signed up successfully', toastOptions as any);

				router.push('/');
			} catch (error: any) {
				console.log(error);
			} finally {
				toast.dismiss('loadingToast');
			}
		} else {
		}
	}

	return (
		<form className=" my-4" onSubmit={handleSubmit}>
			<div className="flex flex-col justify-between items-center gap-3">
				<label>
					<span className="text-xs">Your Email</span>
					<input
						type="email"
						onChange={onChange}
						className="w-full h-10 px-2 rounded-sm outline-none border border-black text-black"
						placeholder="joe@gmail.com"
						name="email"
						value={inputs.email}
					/>
					{errors.email && (
						<small className="text-sm text-red-800">{errors.email}</small>
					)}
				</label>
				<label>
					<span className="text-xs">Display Name</span>
					<input
						type="text"
						onChange={onChange}
						className="w-full h-10 px-2 rounded-sm outline-none border border-black text-black"
						placeholder="Joe mama"
						name="displayName"
						value={inputs.displayName}
					/>
					{errors.displayName && (
						<small className="text-sm text-red-800">{errors.displayName}</small>
					)}
				</label>
				<label>
					<span className="text-xs">Your Password</span>
					<input
						type="password"
						value={inputs.password}
						name="password"
						onChange={onChange}
						className="w-full h-10 px-2 rounded-sm outline-none border border-black text-black"
						placeholder="****"
					/>
					{errors.password && (
						<small className="text-sm text-red-800">{errors.password}</small>
					)}
				</label>
				<button
					type="submit"
					className="w-full h-10 mt-3 rounded-sm bg-yellow-600 hover:bg-yellow-500 transition-all"
				>
					{loading ? 'Signing You Up...' : 'Sign Up'}
				</button>

				<div className="text-xs">
					<span className="text-[13px]">Already Have an account !</span>
					<button
						disabled={loading}
						onClick={onSignInModalOpen}
						className="ml-1 text-yellow-700 "
					>
						Sign In
					</button>
					{error && (
						<span className="text-sm text-red-700">{error.message}</span>
					)}
				</div>
			</div>
		</form>
	);
};
export default Signup;
