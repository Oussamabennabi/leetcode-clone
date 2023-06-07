import React, { useEffect, useState } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { FiRefreshCcw } from 'react-icons/fi';
import Node from 'postcss/lib/node';

type TimerButtonProps = {};

const TimerButton: React.FC<TimerButtonProps> = () => {
	const [showTimer, setShowTimer] = useState(false);
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		let timerId: NodeJS.Timeout;
		if (showTimer) {
			timerId = setInterval(() => {
				setTimer((prevState) => prevState + 1);
			}, 1000);
		}

		return () => {
			clearInterval(timerId);
		};
	}, [showTimer]);
	function handleClockStop() {
		setTimer(0);
		setShowTimer(false);
	}
	function formatTime(time: number) {
		const seconds = time % 60;
		const minuts = Math.floor((time % 3600) / 60);
		const hours = Math.floor(time / 3600);

		return `${hours > 0 ? (hours < 10 ? '0' + hours : hours) : '00'} ${
			minuts > 0 ? (minuts < 10 ? '0' + minuts : minuts) : '00'
		} ${seconds > 0 ? (seconds < 10 ? '0' + seconds : seconds) : '00'}`;
	}
	return (
		<button
			className={`bg-dark-fill-3  hover:bg-dark-fill-2 transition-all grid h-[40px] place-items-center px-2 rounded-lg`}
		>
			{showTimer ? (
				<div className="flex justify-center items-center gap-2">
					<p onClick={() => setShowTimer(false)}>{formatTime(timer)}</p>
					<FiRefreshCcw onClick={handleClockStop} />
				</div>
			) : (
				<MdOutlineTimer onClick={() => setShowTimer(true)} />
			)}
		</button>
	);
};
export default TimerButton;
