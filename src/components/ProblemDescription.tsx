import { auth, firestore } from '@/firebase';
import { useGetCurrentProblem } from '@/hooks/useGetCurrentProblem';
import { useGetUsersDataOnProblem } from '@/hooks/useGetUsersDataOnProblem';
import { Problem } from '@/utils/types/problem';
import {
	arrayRemove,
	arrayUnion,
	doc,
	runTransaction,
	updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
	AiFillDislike,
	AiFillLike,
} from 'react-icons/ai';
import { BsCheck2Circle, BsStarFill } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

type ProblemDescriptionProps = {
	problem: Problem;
	_solved:boolean
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem ,_solved}) => {
	const [user] = useAuthState(auth);
	const { currentProblem, loading,  setCurrentProblem } =
		useGetCurrentProblem(problem.id);
	const { liked, disliked, solved, setData, starred } =
		useGetUsersDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);
	const returnUserDataAndProblemData = async (transaction: any) => {
		const userRef = doc(firestore, 'users', user!.uid);
		const problemRef = doc(firestore, 'problems', problem.id);
		const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);
		return { userDoc, problemDoc, userRef, problemRef };
	};

	const handleLike = async () => {
		if (!user) {
			toast.error('You must be logged in to like a problem', {
				position: 'top-left',
				theme: 'dark',
			});
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } =
				await returnUserDataAndProblemData(transaction);

			if (userDoc.exists() && problemDoc.exists()) {
				if (liked) {
					// remove problem id from likedProblems on user document, decrement likes on problem document
					transaction.update(userRef, {
						likedProblems: userDoc
							.data()
							.likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes - 1,
					});

					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, liked: false }));
				} else if (disliked) {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
						dislikedProblems: userDoc
							.data()
							.dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
						dislikes: problemDoc.data().dislikes - 1,
					});

					setCurrentProblem((prev) =>
						prev
							? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
							: null
					);
					setData((prev) => ({ ...prev, liked: true, disliked: false }));
				} else {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes + 1 } : null
					);
					setData((prev) => ({ ...prev, liked: true }));
				}
			}
		});
		setUpdating(false);
	};

	const handleDislike = async () => {
		if (!user) {
			toast.error('You must be logged in to dislike a problem', {
				position: 'top-left',
				theme: 'dark',
			});
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } =
				await returnUserDataAndProblemData(transaction);
			if (userDoc.exists() && problemDoc.exists()) {
				// already disliked, already liked, not disliked or liked
				if (disliked) {
					transaction.update(userRef, {
						dislikedProblems: userDoc
							.data()
							.dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: false }));
				} else if (liked) {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
						likedProblems: userDoc
							.data()
							.likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) =>
						prev
							? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }
							: null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true }));
				}
			}
		});
		setUpdating(false);
	};

	const handleStar = async () => {
		if (!user) {
			toast.error('You must be logged in to star a problem', {
				position: 'top-left',
				theme: 'dark',
			});
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firestore, 'users', user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firestore, 'users', user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};
	return (
		<div className=" p-2 -mb-2  overflow-y-auto pr-0">
			{/* TAB */}
			<div className="flex  w-full items-center   text-white overflow-x-hidden">
				<div
					className={
						'bg-zinc-800 rounded-t-[5px] px-5 py-[10px]  text-xs cursor-pointer'
					}
				>
					Description
				</div>
			</div>

			<div className="flex px-0 py-4 bg-zinc-800  ">
				<div className="px-5">
					{/* Problem heading */}
					<div className="w-full">
						<div className="flex space-x-4">
							<div className="flex-1 mr-2 text-lg text-white font-medium">
								{problem.title}
							</div>
						</div>

						<div className="flex items-center mt-3">
							{loading && (
								<div className="mt-3 flex space-x-2">
									<RectangleSkeleton />
									<CircleSkeleton />
									<RectangleSkeleton />
									<RectangleSkeleton />
									<CircleSkeleton />
								</div>
							)}
							{!loading && (
								<>
									<div
										className={`rounded-lg  px-2.5 py-1 text-xs font-medium capitalize  ${
											currentProblem?.difficulty === 'Easy'
												? 'text-green-700 bg-green-700 bg-opacity-20'
												: currentProblem?.difficulty === 'Hard'
												? 'text-red-700 bg-red-700 bg-opacity-20'
												: currentProblem?.difficulty === 'Medium'
												? 'text-yellow-600 bg-yellow-700 bg-opacity-20'
												: ''
										} `}
									>
										{currentProblem?.difficulty}
									</div>
									{(solved || _solved) && (
										<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500 cursor-pointer  hover:text-green-600">
											<BsCheck2Circle />
										</div>
									)}

									<div
										className="flex items-center aria-disabled:cursor-wait aria-disabled:pointer-events-none cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
										onClick={handleLike}
										aria-disabled={updating}
									>
										<AiFillLike className={`${liked && 'text-blue-600'}`} />

										<span className="text-xs">{currentProblem?.likes}</span>
									</div>
									<div
										className="flex items-center aria-disabled:cursor-wait aria-disabled:pointer-events-none cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
										onClick={handleDislike}
										aria-disabled={updating}
									>
										<AiFillDislike
											className={`${disliked && 'text-red-500'}`}
										/>

										<span className="text-xs">{currentProblem?.dislikes}</span>
									</div>
									<div
										className="cursor-pointer aria-disabled:cursor-wait aria-disabled:pointer-events-none hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
										onClick={handleStar}
										aria-disabled={updating}
									>
										{starred ? (
											<BsStarFill className=" fill-yellow-500" />
										) : (
											<TiStarOutline />
										)}
									</div>
								</>
							)}
						</div>

						{/* Problem Statement(paragraphs) */}
						<div className="text-white text-sm">
							<div
								dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
							/>
						</div>

						{/* Examples */}
						<div className="mt-4">
							{problem.examples?.map((e, i) => {
								return (
									<div key={i}>
										<p className="font-medium text-white ">Example {i + 1}: </p>
										{e.img && (
											<Image
												src={e.img}
												alt={`example ${i} image`}
												width={300}
												height={300}
											/>
										)}
										<div className="rounded-lg bg-gray-light p-2 my-2">
											<pre>
												<strong className="text-white">Input: </strong>{' '}
												{e.inputText}
												<br />
												<strong>Output:</strong> {e.outputText} <br />
											</pre>
										</div>
									</div>
								);
							})}
						</div>

						{/* Constraints */}
						<div className="my-5">
							<div className="text-white text-sm font-medium">Constraints:</div>
							<ul className="text-white ml-5 list-disc">
								<div
									dangerouslySetInnerHTML={{
										__html: problem.constraints,
									}}
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

const RectangleSkeleton: React.FC = () => {
	return (
		<div className="space-y-2.5 animate-pulse">
			<div className="flex items-center w-full space-x-2">
				<div className="h-6 w-12 rounded-full bg-dark-fill-3"></div>
			</div>
		</div>
	);
};
const CircleSkeleton: React.FC = () => {
	return (
		<div className="space-y-2.5 animate-pulse max-w-lg">
			<div className="flex items-center w-full space-x-2">
				<div className="w-6 h-6 rounded-full bg-dark-fill-3"></div>
			</div>
		</div>
	);
};
