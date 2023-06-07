import { firestore } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react';

type TempFormProps = {

};

const TempForm:React.FC<TempFormProps> = () => {
  	const [inputs, setInputs] = useState({
			id: '',
			title: '',
			difficulty: '',
			category: '',
			link: '',
			order: '',
			likes: 0,
			dislikes: 0,
		});
		function onChange(e: React.ChangeEvent<HTMLInputElement>) {
			setInputs({ ...inputs, [e.target.name]: e.target.value });
		}
		async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
			e.preventDefault();
			try {
				const newProblem = {
					...inputs,
					order: Number(inputs.order),
				};
				await setDoc(doc(firestore, 'problems', inputs.id), newProblem);

				alert('successfuly added the doc');
			} catch (error) {
				alert(error);
			}
		}
  return (
		<form className="mx-auto flex flex-col gap-4 w-44" onSubmit={handleSubmit}>
			<input onChange={onChange} type="text" placeholder="id" name="id" />
			<input onChange={onChange} type="text" placeholder="title" name="title" />
			<input
				onChange={onChange}
				type="number"
				placeholder="order"
				name="order"
			/>
			<input
				onChange={onChange}
				type="text"
				placeholder="difficulty"
				name="difficulty"
			/>
			<input
				onChange={onChange}
				type="text"
				placeholder="category"
				name="category"
			/>
			<input onChange={onChange} type="text" placeholder="link?" name="link?" />
			<button className="text-white">Save Bitch</button>
		</form>
	);
}
export default TempForm;