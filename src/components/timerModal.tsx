import React, { useState } from 'react';

export default function TimerModal() {
	const [hour, setHour] = useState('00');
	const [min, setMin] = useState('00');

	const disabled = parseInt(hour) === 0 && parseInt(min) === 0;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.stopPropagation();
		e.preventDefault();

		const from = new FormData(e.currentTarget);
		const { hour, min, title } = Object.fromEntries(from);
		console.log(hour, min, title);
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
		<div className='modal'>
			<h2>create a new timer</h2>
			<form onSubmit={onSubmit}>
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
				<input
					type='text'
					name='title'
					placeholder='title'
				/>
				<button
					type='submit'
					disabled={disabled}
				/>
			</form>
		</div>
	);
}
