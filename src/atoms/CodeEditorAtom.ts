import { atom } from 'recoil';
 export const FONT_OPTIONS = [12, 14, 16, 20, 22, 24];

type CodeLanguageType = 'javascript'
export type CodeEditorType = {
	language: CodeLanguageType;
	fontSize: number
};

const initialState: CodeEditorType = {
	language: 'javascript',
	fontSize:12
};

export const codeEditorState = atom<CodeEditorType>({
	key: 'codeEditorState',
	default: initialState,
});
