import { FONT_OPTIONS, codeEditorState } from '@/atoms/CodeEditorAtom';
import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai'
import { useRecoilState } from 'recoil';

type SelectFontSizeDropDownProps = {};

const SelectFontSizeDropDown: React.FC<SelectFontSizeDropDownProps> = () => {
	const [expand, setExpand] = useState(false);
	const [code, setCode] = useRecoilState(codeEditorState);
	function onClick() {
		setExpand((prev) => !prev);
	}

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					onClick={onClick}
					type="button"
					className="inline-flex w-28 text-white justify-center gap-x-1.5 rounded-sm bg-zinc-900 px-3 py-2 text-sm font-semibold  shadow-sm  ring-inset  hover:bg-opacity-90"
					aria-expanded={true}
					aria-haspopup={true}
				>
					Options
					<svg
						className="-mr-1 h-5 w-5 text-white"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div
				className={`absolute right-0 z-10 mt-2 w-28 ${
					expand ? 'transform opacity-100 scale-100' : 'scale-0 opacity-0'
				} transition ease-out duration-100 origin-top rounded-sm bg-dark-layer-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}
			>
				<div className="py-1" role="none">
					{FONT_OPTIONS.map((o, i) => {
						return (
							<div
								key={o}
								className={` flex justify-between items-center text-gray-300 cursor-pointer block px-4 py-2 text-sm hover:bg-dark-fill-2 transition-all ${
									code.fontSize === FONT_OPTIONS[i] && 'bg-dark-fill-3 '
								}`}
								onClick={() =>
									setCode((prev) => ({ ...prev, fontSize: FONT_OPTIONS[i] }))
								}
								tabIndex={-1}
							>
								<span>{o}px</span>
								{code.fontSize === FONT_OPTIONS[i] && (
									<div>
										<AiOutlineCheck className="text-gray-300 " />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default SelectFontSizeDropDown;
