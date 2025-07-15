import { useClock } from '../hooks/useClock';

export default function Clock() {
	const clock = useClock();
	return <p>{clock}</p>;
}
