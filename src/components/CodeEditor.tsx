import React from 'react';
import SettingsTopbar from './SettingsTopbar';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { Problem } from '@/utils/types/problem'
import { useRecoilValue } from 'recoil'
import { codeEditorState } from '@/atoms/CodeEditorAtom'

type CodeEditorProps = {
	problem: Problem
	onChange: (v:string) => void
	userCode:string

};

const CodeEditor: React.FC<CodeEditorProps> = ({problem,userCode,onChange}) => {
	const editorSettings = useRecoilValue(codeEditorState)
	console.log(editorSettings.fontSize);
	return (
		<section className="  ">
			<SettingsTopbar />
			<div
				className={`bg-zinc-800 relative text-[${editorSettings.fontSize}px]   h-[calc(100%-2.2rem)] w-full`}
			>
				<CodeMirror
					value={userCode}
					// height="200px"
					className={`h-[calc(100%)] overflow-scroll w-full  `}
					theme={vscodeDark}
					extensions={[javascript({ jsx: true })]}
					onChange={onChange}
				/>
			</div>
		</section>
	);
};
export default CodeEditor;
