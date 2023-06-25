'use client';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from 'next/font/google';

import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RecoilRoot>
			<html lang="en">
				<body className={`${inter.className} bg-zinc-900 `}>
					<ToastContainer />
					{children}
				</body>
			</html>
		</RecoilRoot>
	);
}
