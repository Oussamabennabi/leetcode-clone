import React, { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';

import { modalState } from '@/atoms/ModalAtom';
import { useRecoilState } from 'recoil';
type ModalProps = {
	children: React.ReactNode;
	largeSize?: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, largeSize }) => {
	const [modal, setModal] = useRecoilState(modalState);
	function onClose() {
		setModal((prev) => ({ ...prev, open: false }));
	}
	function escHandler(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', escHandler);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('keydown', escHandler);
			}
		};
	}, []);

	return (
		<div
			className={`fixed inset-0  modal-content ${
				modal?.open ? '' : 'pointer-events-none'
			}`}
		>
			{/* backdrop */}
			<div
				className={`transition-opacity duration-300 ease-in-out fixed  inset-0  bg-black  ${
					modal?.open ? 'opacity-50' : 'pointer-events-none opacity-0'
				}`}
				onClick={onClose}
			/>

			{/* content */}
			<div
				className={`transition-opacity modal-content  duration-300 ease-in-out fixed -translate-x-1/2  top-1/2 -translate-y-1/2 left-1/2 right-0  my-auto bg-zinc-800 w-96 text-white shadow-lg  rounded-sm  p-4 ${
					modal?.open ? 'opacity-100' : 'pointer-events-none opacity-0'
				} ${largeSize && 'w-2/6'}`}
			>
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-lg capitalize ">{modal?.type}</h3>
					<button
						onClick={onClose}
						className="p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-10 "
					>
						<GrClose fill="#ffffff" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};
export default Modal;
