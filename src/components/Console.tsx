import { auth, firestore } from '@/firebase'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { problems } from '@/utils/problems'
import { Problem } from '@/utils/types/problem';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import React, { useState,useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsChevronUp } from 'react-icons/bs'
import { toast } from 'react-toastify'

type ConsoleProps = {
	problem: Problem;
	handleSubmit: () => void;
};

const Console: React.FC<ConsoleProps> = ({ problem, handleSubmit }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState(0);

	return (
		<div className="bg-zinc-800 relative p-2 flex flex-col w-full px-5 overflow-auto">
			{/* testcase heading */}
			<div className="flex h-10 items-center space-x-6">
				<div className="relative flex h-full flex-col justify-center cursor-pointer">
					<div className="text-sm font-medium leading-5 text-white underline underline-offset-8">
						Testcases
					</div>
				</div>
			</div>

			<div className="flex">
				{problem.examples.map((example, index) => (
					<div
						className="mr-2 items-start mt-2 "
						key={example.id}
						onClick={() => setActiveTestCaseId(index)}
					>
						<div className="flex flex-wrap items-center gap-y-4">
							<div
								className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2  relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? 'text-white' : 'text-dark-label-2'}
									`}
							>
								Case {index + 1}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="font-semibold my-2">
				<p className="text-sm font-medium mt-2 text-white">Input:</p>
				<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-zinc-900 border-transparent text-white mt-2">
					{problem.examples[activeTestCaseId].inputText}
				</div>
				<p className="text-sm font-medium mt-2 text-white">Output:</p>
				<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-zinc-900 border-transparent text-white mt-2">
					{problem.examples[activeTestCaseId].outputText}
				</div>
			</div>
			<div className="flex  ">
				<div className=" my-[10px] flex justify-between w-full">
					<div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
						<button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2">
							Console
							<div className="ml-1 transform transition flex items-center">
								<BsChevronUp className="fill-gray-6 mx-1 fill-dark-gray-6" />
							</div>
						</button>
					</div>

					<div className="ml-auto flex items-center space-x-4">
						<button
							className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg"
							onClick={handleSubmit}
						>
							Run
						</button>
						<button
							className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Console;
