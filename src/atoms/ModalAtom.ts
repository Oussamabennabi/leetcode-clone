import { atom } from 'recoil';

type ModalWindow = 'sign up' | 'sign in' | 'reset password'|'settings';
export type ModalType = {
	type: ModalWindow;
	open: boolean;
};

const initialState: ModalType = {
	type: 'sign in',
	open: false,
};

export const modalState = atom<ModalType>({
	key: 'modalState',
	default: initialState,
});
