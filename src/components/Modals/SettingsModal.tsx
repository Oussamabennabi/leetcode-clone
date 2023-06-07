import React from 'react';
import Modal from './Modal'
import SelectFontSizeDropDown from '../buttons/SelectFontSizeDropDown'

type SettingsModalProps = {};

const SettingsModal: React.FC<SettingsModalProps> = () => {
  return (
		<Modal largeSize>
			<div className='flex justify-between items-center pt-4 border-t-2 border-zinc-700'>
				<div className=''>
					<h5 className='font-bold text-sm'>Font Size</h5>
					<p className='text-[14px]'>Choose your preferred font size for the code editor.</p>
				</div>
				<SelectFontSizeDropDown/>
			</div>
		</Modal>
	);
};
export default SettingsModal;
