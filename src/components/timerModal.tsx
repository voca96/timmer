import React, { useState } from 'react';
import { AddIcon, CloseIcon } from './icons';
import { clock, timer } from '../types/timers';

interface TimerModalProps {
	onClose: () => void;
	createTimer: (newTimer: timer) => void;
}

export default function TimerModal({ onClose, createTimer }: TimerModalProps) {
	const [hour, setHour] = useState('00');
	const [min, setMin] = useState('00');

	const disabled = parseInt(hour) === 0 && parseInt(min) === 0;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.stopPropagation();
		e.preventDefault();

		const from = new FormData(e.currentTarget);
		const { hour, min, title } = Object.fromEntries(from);

		// revisar
		const newTimer = {
			id: crypto.randomUUID(),
			title: title.toString(),
			timer: `${hour.toString().padStart(2, '0')}:${min
				.toString()
				.padStart(2, '0')}:00` as clock,
		};
		createTimer(newTimer);
		onClose();
	};

	const onHandleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rex = /^(^$|[0-1]|(0[1-9]|1[0-2]))$/;
		if (rex.test(e.currentTarget.value)) setHour(e.currentTarget.value);
	};

	const onHandleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rex = /^(^$|[0-5]|([0-5][0-9]))$/;
		if (rex.test(e.currentTarget.value)) setMin(e.currentTarget.value);
	};

	return (
		<div className='modal-container'>
			<div className='modal'>
				<span
					className='close-modal-button'
					onClick={onClose}
				>
					<CloseIcon />
				</span>
				<h2>New timer</h2>
				<form onSubmit={onSubmit}>
					<input
						type='text'
						name='title'
						autoComplete='off'
						placeholder='Proyecto de Inventario ...'
					/>
					<div>
						<input
							type='text'
							name='hour'
							value={hour}
							maxLength={2}
							placeholder='00'
							onChange={onHandleHour}
						/>
						<p>:</p>
						<input
							type='text'
							name='min'
							value={min}
							maxLength={2}
							placeholder='00'
							onChange={onHandleMin}
						/>
					</div>

					<button
						type='submit'
						disabled={disabled}
					>
						<AddIcon />
					</button>
				</form>
			</div>
		</div>
	);
}
