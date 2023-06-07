import { firestore } from "@/firebase"
import { DBProblem } from "@/utils/types/problem"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"

export function useGetProblems() {
	const [problems, setProblems] = useState < DBProblem[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		const main = async () => {
			try {
				setLoading(true)
				const q = query(collection(firestore, 'problems'), orderBy('order', 'asc'));
				const querySnapshot = await getDocs(q);
				const temp: DBProblem[] = [];
				querySnapshot.forEach((doc) => {
					temp.push({ id: doc.id, ...doc.data() } as DBProblem);
				});
				setProblems(temp);
				setLoading(false)
			} catch (error) {
				console.log(error);
			}
		};
		main();
	}, []);
	return {problems,loading}
}