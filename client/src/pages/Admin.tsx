import { useState } from 'react'
import { Message } from '../types/Message'
import { MessageForm } from '../types/MessageForm';
import { Photo } from '../types/Photo'
import { dummyPhotos, dummyMessages } from '../data/dummy';

const Admin = () => {
	const [messages, setMessages] = useState<Message[]>(dummyMessages);
	const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [photos, setPhotos] = useState<Photo[]>(dummyPhotos);

	const [messageForm, setMessageForm] = useState<MessageForm>({
		title: '',
		date: '',
		message: ''
	})

	const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setMessageForm(prev => ({
			...prev,
			[name]: value
		}))
	}
	const handleChangePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files 
		if (!files) return
		setSelectedFiles(Array.from(files))
	}

	const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		//check if editing or submitting new message
		//submit POST or PATCH request
		setMessageForm({
			title: "",
			date: "",
			message: ""
		});
	}
	const handleSubmitPhotos = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		//submit array of photos
		setSelectedFiles([])
	}

	const handleDelete = (type: "photo" | "message", id: number) => {
		// DELETE request here
	}

	const messageTiles = messages.map(messageData => (
		<div key={messageData.id} className='messageTile'>
			<button type='button' className='redX message' onClick={() => handleDelete('message', messageData.id)}>×</button>
			<h3>{messageData.title}</h3>
		</div>
	))

	const photoThumbs = photos.map(photo => (
		<div key={photo.id} className='photoThumb'>
			<button type='button' className='redX photo' onClick={() => handleDelete('photo', photo.id)}>×</button>
			<img src={photo.url} alt={photo.caption || '교회 사진'}></img>
			<p>{photo.caption}</p>
		</div>
	))

	return (
		<div className='mainPage admin'>
			<div className='child child1'>
				<h3 className='sectionHeading'>이 목사님, 환영합니다!</h3>
				<div className='formAndHistory'>
					<form className='createMessageForm' onSubmit={handleSubmitMessage}>
						<label htmlFor='title'>말씀 제목</label>
						<input type='text' id='title' name='title' placeholder='말씀 제목' onChange={handleChangeMessage}></input>
						<label htmlFor='title'>날짜</label>
						<input type='date' id='date' name='date' onChange={handleChangeMessage}></input>
						<label htmlFor='title'>목화자의 말씀</label>
						<textarea id='message' name='message' onChange={handleChangeMessage}></textarea>
						<div className='formBtnBox'>
							<button type='submit' className='pageBtn'>저장하기</button>
							<button type='button' className='pageBtn'>취소하기</button>
						</div>
					</form>
					<div className='messageTileBox'>
						{messageTiles}
						{messageTiles}
						{messageTiles}
						{messageTiles}
					</div>
				</div>	
			</div>
			<div className='child child2'>
				<h3 className='sectionHeading'>교회 사진 갤러리</h3>
				<form className='photoForm' onSubmit={handleSubmitPhotos}>
					<label htmlFor='photos'>
						{selectedFiles.length
							? `${selectedFiles.length} 개의 사진 선택됨`
							: "사진을 선택하세요"}
					</label>
					<input id='photos' name='photos' type='file' accept='image/*' multiple className='photoFileInput' onChange={handleChangePhotos}></input>
					<button type='submit' className='pageBtn'>사진 업로드</button>
				</form>
				<div className='photoGallery'>
					{photoThumbs}
					{photoThumbs}
					{photoThumbs}
				</div>
			</div>
			<div className='child child3'>
				<h3 className='sectionHeading'>교회 동영상</h3>
			</div>
		</div>
	)
}

export default Admin;