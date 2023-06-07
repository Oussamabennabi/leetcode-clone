"use client"
import Navbar from '@/components/Navbar'
import ProblemsTable from '@/components/ProblemsTable';

import TempForm from './TempForm'

export default function Home() {

	return (
		<main className="min-h-screen bg-zinc-900">
			<Navbar />

			<section className="h-full py-3">
				<h1 className="text-white text-4xl text-center pb-4">Problems :</h1>
				<ProblemsTable />
			{/* <TempForm/> */}
			</section>
		</main>
	);
}
