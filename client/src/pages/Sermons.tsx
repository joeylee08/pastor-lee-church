import { useState, useEffect } from 'react'
import { Sermon } from '../types/Sermon';
import Placeholder from '../components/Placeholder';

const Sermons = () => {
	const [sermons, setSermons] = useState<Sermon[]>([]);

	useEffect(() => {
    const fetchSermons = async () => {
			try {
				const response = await fetch("/api/sermons");
				if (!response.ok) throw new Error("Failed to fetch sermons")

				const data: Sermon[] = await response.json();
				setSermons(data);
			} catch (error) {
				console.error("Failed to fetch sermons:", error);
			}
    };
		fetchSermons();
	}, []);

	const sermonThumbs = sermons.map(sermon => (
		<div key={sermon.id} className='sermonThumb'>
			<a href={sermon.url} target="_blank" rel="noopener noreferrer">
				<div className="pptIcon">PPT</div>
				<p>{sermon.title}</p>
			</a>
		</div>
	))

	return (
		<div className='mainPage sermons'>
			<div className='child child1'>
				<h3 className='sectionHeading'>지난 설교 파워포인트</h3>
				{sermons.length === 0 ? <Placeholder /> : null}
				<div className='sermonGallery'>{sermonThumbs}</div>
			</div>
		</div>
	);
}

export default Sermons