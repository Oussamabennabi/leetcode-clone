'use client';
import CodeEditor from '@/components/CodeEditor';
import Console from '@/components/Console';
import { useWindowSize } from '@/hooks/useWindowSize';
import Navbar from '@/components/Navbar';
import ProblemDescription from '@/components/ProblemDescription';
import { auth, firestore } from '@/firebase'
import {  problems } from '@/utils/problems';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React,{useEffect,useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import Split from 'react-split';
import { toast } from 'react-toastify'
import ReactConfetti from 'react-confetti'



const Page = (p:any) => {
	const problem = problems[p.params.pid]
let [userCode, setUserCode] = useState<string>(problem.starterCode);

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


export default Page;
