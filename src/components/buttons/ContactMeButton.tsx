import Link from 'next/link';
import React from 'react';

type ContactMeButtonProps = {};

const ContactMeButton: React.FC<ContactMeButtonProps> = () => {
	return (
		<button className="rounded-lg bg-dark-fill-3 hover:bg-zinc-600 transition-all font-semibold text-xs px-2 py-1.5">
			<Link
				target="_blank"
				href={'https://www.linkedin.com/in/oussama-bennabi/'}
			>
				Contact Me
			</Link>
		</button>
	);
};
export default ContactMeButton;
