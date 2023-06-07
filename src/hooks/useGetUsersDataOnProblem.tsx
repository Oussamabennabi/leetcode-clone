import { auth, firestore } from "@/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import {useEffect,useState} from 'react'
import { doc, getDoc } from "firebase/firestore"
export function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({
		liked: false,
		disliked: false,
		starred: false,
		solved: false,
	});
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, 'users', user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const {
					solvedProblems,
					likedProblems,
					dislikedProblems,
					starredProblems,
				} = data;
				setData({
					liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
					disliked: dislikedProblems.includes(problemId),
					starred: starredProblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () =>
			setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}
