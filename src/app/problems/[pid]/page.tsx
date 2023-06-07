'use client';
import CodeEditor from '@/components/CodeEditor';
import Console from '@/components/Console';
import { useWindowSize } from '@/hooks/useWindowSize';
import Navbar from '@/components/Navbar';
import ProblemDescription from '@/components/ProblemDescription';
import { auth, firestore } from '@/firebase'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { fn, problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useParams } from 'next/navigation'
import React,{useEffect,useState} from 'react';
import Confetti from 'react-confetti/dist/types/Confetti'
import { useAuthState } from 'react-firebase-hooks/auth'
import Split from 'react-split';
import { toast } from 'react-toastify'
import ReactConfetti from 'react-confetti'

type PageProps = {
	problem: Problem;
};

const Page = (p:any) => {
	console.log(p);
	const problem = problems[p.params.pid]
let [userCode, setUserCode] = useState<string>(problem.starterCode);

const [fontSize, setFontSize] = useLocalStorage('lcc-fontSize', '16px');

// const [settings, setSettings] = useState<ISettings>({
// 	fontSize: fontSize,
// 	settingsModalIsOpen: false,
// 	dropdownIsOpen: false,
// });
const { width, height } = useWindowSize();
const [success, setSuccess] = useState(false);
const [solved, setSolved] = useState(false);

const { pid }: any = useParams();
const [user] = useAuthState(auth);
const handleSubmit = async () => {
	if (!user) {
		toast.error('Please login to submit your code', {
			position: 'top-center',
			autoClose: 3000,
			theme: 'dark',
		});
		return;
	}
	try {
		userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
		const cb = new Function(`return ${userCode}`)();
		const handler = problems[pid as string].handlerFunction;

		if (typeof handler === 'function') {
			const success = handler(cb);
			if (success) {
				toast.success('Congrats! All tests passed!', {
					position: 'top-center',
					autoClose: 3000,
					theme: 'dark',
				});
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 4000);

				const userRef = doc(firestore, 'users', user.uid);
				await updateDoc(userRef, {
					solvedProblems: arrayUnion(pid),
				});
				setSolved(true);
			}
		}
	} catch (error: any) {
		console.log(error.message);
		if (
			error.message.startsWith(
				'AssertionError'
			)
		) {
			toast.error('Oops! One or more test cases failed', {
				position: 'top-center',
				autoClose: 3000,
				theme: 'dark',
			});
		} else {
			toast.error(error.message, {
				position: 'top-center',
				autoClose: 3000,
				theme: 'dark',
			});
		}
	}
};
useEffect(() => {
	const code = localStorage.getItem(`code-${pid}`);
	if (user) {
		setUserCode(code ? JSON.parse(code) : problem.starterCode);
	} else {
		setUserCode(problem.starterCode);
	}
}, [pid, user, problem.starterCode]);

const onChange = (value: string) => {
	setUserCode(value);
	localStorage.setItem(`code-${pid}`, JSON.stringify(value));
};
	return (
		<main className="text-white  h-screen overflow-x-hidden">
			<Navbar problemPage />
			<Split
				sizes={[40, 60]}
				minSize={[0, 500]}
				direction="horizontal"
				className="h-[calc(100vh-55px)] split"
			>
				<ProblemDescription _solved={solved} problem={problem} />

				<Split  sizes={[50, 50]} direction="vertical">
					<CodeEditor
						problem={problem}
						onChange={onChange}
						userCode={userCode}
					/>
					<Console problem={problem} handleSubmit={handleSubmit} />
				</Split>
			</Split>
			{success && (
				<ReactConfetti
					gravity={0.3}
					tweenDuration={4000}
					width={width - 1}
					height={height - 1}
				/>
			)}
		</main>
	);
};
export const getStaticPaths: GetStaticPaths = async () => {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));
	return {
		paths,
		fallback: false,
	};
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { pid }: any = params;
	const problem = fn(pid);
	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: { problemss: { hi: 'hi', hello: 'hello' } },
	};
};

export default Page;
