import { modalState } from '@/atoms/ModalAtom';
import React, { useState } from 'react';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import SettingsModal from './Modals/SettingsModal';
type SettingsTopbarProps = {};

const SettingsTopbar: React.FC<SettingsTopbarProps> = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [modal, setModal] = useRecoilState(modalState);
	const onFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setIsFullScreen(true);
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
			setIsFullScreen(false);
		}
	};
	function onSettingsModalOpen() {
		setModal({
			type: 'settings',
			open: true,
		});
	}
	return (
		<div className="flex justify-between px-2 my-1 h-8 bg-zinc-900">
			<button className="py-0.5 px-2 rounded-lg bg-zinc-800 hover:bg-gray-light mr-auto text-sm ">
				Javascript
			</button>
			<button
				onClick={onSettingsModalOpen}
				className="py-1.5 px-2 rounded-lg  hover:bg-gray-light "
			>
				<FiSettings />
			</button>
			<button
				onClick={onFullScreen}
				className="py-1.5 px-2 rounded-lg  hover:bg-gray-light "
			>
				{isFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
			</button>
			{modal?.type === 'settings' && <SettingsModal />}
		</div>
	);
};
export default SettingsTopbar;
