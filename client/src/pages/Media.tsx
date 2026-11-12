import { dummyPhotos } from '../data/dummy';
import { Photo } from '../types/Photo';
import { Video } from '../types/Video'
import { useState, useEffect } from 'react'
import { dummyVideos } from '../data/dummy';

const Media = () => {
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [videos, setVideos] = useState<Video[]>([])
	const [selectedVideoId, setSelectedVideoId] = useState<string>("");

	useEffect(() => {
		const fetchMedia = async () => {
			try {
				const [photoResponse, videoResponse] = await Promise.all([
					fetch("/api/photos"),
					fetch("/api/videos"),
				]);

				if (!photoResponse.ok || !videoResponse.ok) {
					throw new Error("Failed to fetch media");
				}

				const photoData: Photo[] = await photoResponse.json();
				const videoData: Video[] = await videoResponse.json();

				setPhotos(photoData);
				setVideos(videoData);
				setSelectedVideoId(videoData[0]?.id ?? "");

			} catch (error) {
				console.error("Failed to load media:", error);
			}
		};

		fetchMedia();
	}, []);

	const photoImgs = photos.map(photo => (
		<div key={photo.id} className='photoImg'>
			<img src={photo.url} alt={photo.caption || '교회 사진'}></img>
		</div>
	))

	const videoThumbs = videos.map(video => (
		<div key={video.id} className='videoThumb' onClick={() => setSelectedVideoId(video.id)}>
			<img src={video.thumbnailUrl} alt="" />
			<p>{video.title}</p>
		</div>
	))

	return (
		<div className='mainPage media'>
			<div className='child child1'>
				<h3 className='sectionHeading'>교회 사진 갤러리</h3>
				<div className='photoGallery'>
					{photoImgs}
				</div>
			</div>
			<div className='child child1a'>
				<h3 className='sectionHeading'>교회 동영상 플레이리스트</h3>
			</div>
			<div className='child child2'>
				<div className='videoPlayer'>
						<iframe
							src={`https://www.youtube.com/embed/${selectedVideoId}`}
							title="교회 설교 영상"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
				</div>
				<div className='videoGrid'>
					<div className='videoScroll'>
						{videoThumbs}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Media