import { auth } from '@/firebase';
import React, { useEffect, useRef } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { toastOptions } from '../toast';
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
	const [sendPasswordResetEmail, sending, error] =
		useSendPasswordResetEmail(auth);

	const emailRef = useRef<HTMLInputElement>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!emailRef?.current?.value) {
			return;
		}
		try {
			const success = await sendPasswordResetEmail(emailRef.current.value);
			if (!success) {
				toast.error('email was not sent', toastOptions as any);
				return;
			}
			toast.success('email was not sent', toastOptions as any);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		if (error) {
			console.log('firebase Error:' + error);
		}
	}, [error]);
	return (
		<form onSubmit={handleSubmit} className=" my-4">
			<div className="flex flex-col justify-between items-center gap-3">
				<p className="text-xs">
					Forgotten your password ? Enter your e-mail address below and
					we&apos;ll send you an e-mail allowing you to reset it
				</p>
				<label className="w-full">
					<span className="text-xs">Email</span>
					<input
						type="email"
						className="w-full h-10 px-2 rounded-sm outline-none border border-black text-black"
						placeholder="joe@gmail.com"
						ref={emailRef}
					/>
				</label>
				<div className="text-xs">
					<button
						disabled={sending}
						type={'submit'}
						className="ml-1 text-yellow-700 "
					>
						Reset Password
					</button>
				</div>
			</div>
		</form>
	);
};
export default ResetPassword;
