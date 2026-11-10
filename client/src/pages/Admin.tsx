import { useState } from 'react'
import { Message } from '../types/Message'
import { MessageForm } from '../types/MessageForm';
import dummyMessages from '../data/dummy';

const Admin = () => {
	const [messages, setMessages] = useState<Message[]>(dummyMessages);

	const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
	const [messageForm, setMessageForm] = useState<MessageForm>({
		title: '',
		date: '',
		message: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setMessageForm(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		//check if editing or submitting new message
		//submit POST or PATCH request
		setMessageForm({
			title: "",
			date: "",
			message: ""
		});
	}

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// DELETE request here
	}

	const messageTiles = messages.map(messageData => (
		<div className='messageTile'>
			<h3>{messageData.title}</h3>
			<h3>{messageData.date}</h3>
		</div>
	))

	return (
		<div className='mainPage admin'>
			<div className='child child1'>
				<h3 className='sectionHeading'>이 목사님, 환영합니다!</h3>
				<div className='formAndHistory'>
					<form className='createMessageForm'>
						<label htmlFor='title'>말씀 제목</label>
						<input type='text' id='title' name='title' placeholder='말씀 제목' onChange={handleChange}></input>
						<label htmlFor='title'>날짜</label>
						<input type='date' id='date' name='date' onChange={handleChange}></input>
						<label htmlFor='title'>목화자의 말씀</label>
						<textarea id='message' name='message' onChange={handleChange}></textarea>
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
				<form className='photoForm'>
					<label htmlFor='photoUrl'>사진 선택</label>
					<input id='photoUrl' name='photoUrl' type='text' className='photoUrl'></input>
					<button type='submit' className='pageBtn'>사진 업로드</button>
				</form>
				<div className='photoGallery'>

				</div>
			</div>
			<div className='child child3'>
				<h3 className='sectionHeading'>교회 동영상</h3>
			</div>
		</div>
	)
}

export default Admin;