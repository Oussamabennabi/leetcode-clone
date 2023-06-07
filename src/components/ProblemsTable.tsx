'use client';
import { useGetProblems } from '@/hooks/useGetProblems'

import Link from 'next/link';
import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { BsCheck2Circle } from 'react-icons/bs';

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
	const { problems, loading } = useGetProblems();

	return (
		<table className="w-[80%] rounded-lg overflow-hidden  mx-auto border-collapse border border-slate-500 table table-auto text-white bg-zinc-800">
			<thead>
				<tr className="text-left text-zinc-500">
					<th className="border-b border-zinc-500 p-4">Status</th>
					<th className="border-b border-zinc-500 p-4">Problem</th>
					<th className="border-b border-zinc-500 p-4">Dificulty</th>
					<th className="border-b border-zinc-500 p-4">Category</th>
					<th className="border-b border-zinc-500 p-4">Solution</th>
				</tr>
			</thead>

			<tbody className="border-spacing-4 border-separate">
				{loading===true ? (
					<>
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
						<LoadingSkeleton />
					</>
				) : (
					problems.map((p, i) => {
						const dificultyColor =
							p.difficulty === 'Easy'
								? 'text-green-700'
								: p.difficulty === 'Hard'
								? 'text-red-700'
								: p.difficulty === 'Medium'
								? 'text-yellow-600'
								: '';
						const solutionLink = "dd";// TODO:

						const categoryTag = p.category.replace(' ', '-').toLowerCase();
						return (
							<tr
								key={i}
								className={`border border-zinc-700 ${
									i % 2 == 1 ? 'bg-zinc-800' : 'bg-zinc-900'
								} `}
							>
								<td className="p-4">
									<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500 cursor-pointer  hover:text-green-600">
										<BsCheck2Circle />
									</div>
								</td>
								<td className="p-4">
									<Link href={`/problems/${p.id}`} className="hover:underline">
										{p.order}. {p.title}
									</Link>
								</td>
								<td className={`p-4 ${dificultyColor} `}>{p.difficulty}</td>
								<td className="p-4">
									<Link
										target="_blank"
										className="hover:underline"
										href={`https://leetcode.com/tag/${categoryTag}`}
									>
										{p.category}
									</Link>
								</td>
								<td className="p-4">
									<Link target="_blank" href={`${solutionLink}`}>
										<BiLinkExternal />
									</Link>
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</table>
	);
};
export default ProblemsTable;

function LoadingSkeleton() {
	return (
		<tr role="status" className="animate-pulse ">
			<td className=" bg-gray-200 rounded-sm h-12 border-4 border-zinc-900   dark:bg-gray-700 p-4 "></td>
			<td className=" bg-gray-200 rounded-sm h-12 border-4 border-zinc-900  dark:bg-gray-700 p-4   "></td>
			<td className=" bg-gray-200 rounded-sm h-12 border-4 border-zinc-900  dark:bg-gray-700 p-4  "></td>
			<td className=" bg-gray-200 rounded-sm h-12 border-4 border-zinc-900  dark:bg-gray-700 p-4   "></td>
			<td className=" bg-gray-200 rounded-sm h-12 border-4 border-zinc-900  dark:bg-gray-700 p-4  "></td>

		</tr>
	);
}

