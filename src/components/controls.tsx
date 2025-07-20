import { AudioSelect, playSound } from '../helpers';
import { TimerState } from '../types/timers';
import { PlayIcon, ResumeIcon, StopIcon } from './icons';

interface ControlsProps {
	timerState: TimerState;
	start: () => void;
	restart: () => void;
	stop: () => void;
	notification: boolean;
}

export default function Controls({
	timerState,
	start,
	restart,
	stop,
	notification,
}: ControlsProps) {
	const onPlay = () => {
		playSound(AudioSelect, notification);
		start();
	};

	const onClose = () => {
		playSound(AudioSelect, notification);
		stop();
	};

	const onRestart = () => {
		playSound(AudioSelect, notification);
		restart();
	};

	return (
		<div className='controls'>
			{/* start, stop reset*/}
			{timerState !== 'empty-timer' && (
				<>
					{(timerState === 'stand-by' || timerState === 'stop') && (
						<span onClick={onPlay}>
							<PlayIcon />
						</span>
					)}

					{timerState === 'on-going' && (
						<span onClick={onClose}>
							<StopIcon />
						</span>
					)}
					{(timerState === 'stop' || timerState === 'finished') && (
						<span onClick={onRestart}>
							<ResumeIcon />
						</span>
					)}
				</>
			)}
		</div>
	);
}
