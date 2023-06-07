import React from 'react';
import Modal from './Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '@/atoms/ModalAtom'
import Signup from './Signup'
import Signin from './Signin'
import ResetPassword from './ResetPassword'

type AuthModalProps = {

};

const AuthModal:React.FC<AuthModalProps> = () => {
	const [modal, setModal] = useRecoilState(modalState);


  return (
		<Modal>
			{modal?.type === 'sign up' ? (
				<Signup />
			) : modal?.type === 'sign in' ? (
				<Signin />
			) : modal?.type === 'reset password' ? (
				<ResetPassword />
			) : (
				''
			)}
		</Modal>
	);
}
export default AuthModal;