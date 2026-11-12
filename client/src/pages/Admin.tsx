import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { Message } from '../types/Message'
import { MessageForm } from '../types/MessageForm';
import { Photo } from '../types/Photo'
import { Sermon } from '../types/Sermon'
import { dummyPhotos, dummyMessages } from '../data/dummy';


const Admin = ()  => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [sermons, setSermons] = useState<Sermon[]>([]);

	const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
	const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
	const [selectedSermon, setSelectedSermon] = useState<File | null>(null);
	
	const [messageForm, setMessageForm] = useState<MessageForm>({
		title: '',
		date: '',
		message: ''
	})

	useEffect(() => {
    const fetchData = async () => {
        try {
            const [messagesRes, photosRes, sermonsRes] = await Promise.all([
                fetch('/api/messages'),
                fetch('/api/photos'),
                fetch('/api/sermons')
            ]);
            if (!messagesRes.ok || !photosRes.ok || !sermonsRes.ok) {
                throw new Error("Failed to fetch admin data");
            }
            const [messagesData, photosData, sermonsData] = await Promise.all([
                messagesRes.json(),
                photosRes.json(),
                sermonsRes.json()
            ]);
            setMessages(messagesData);
            setPhotos(photosData);
            setSermons(sermonsData);
        } catch (error) {
            console.error("Failed to load admin data:", error);
        }
    };
    fetchData();
}, []);

	const handleSelectMessage = (message: Message) => {
		setSelectedMessageId(message.id)
		setMessageForm({
			title: message.title,
			date: message.date,
			message: message.message
		})
	}
	const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setMessageForm(prev => ({
			...prev,
			[name]: value
		}))
	}
	const handleClearMessageForm = () => {
		setSelectedMessageId(null)
		setMessageForm({
			title: '',
			date: '',
			message: ''
		})
	}
	const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const updated = {
			title: messageForm.title,
			date: messageForm.date,
			message: messageForm.message
		}

		if (selectedMessageId !== null) {
			try {
				const response = await fetch(`/api/messages/${selectedMessageId}`, {
						method: "PATCH",
						credentials: "include",
						headers: { 'Content-Type': 'application/json'},
						body: JSON.stringify(updated)
				});
				if (!response.ok) throw new Error("Failed to update message");
    		const savedMessage = await response.json();
				setMessages(prev => prev.map(message => message.id === selectedMessageId ? savedMessage : message))
				handleClearMessageForm();
			} catch (error) {
				console.error("Message update failed:", error);
			}
		} else {
			try {
				const response = await fetch(`/api/messages`, {
					method: "POST",
					credentials: "include",
					headers: { 'Content-Type': 'application/json'},
					body: JSON.stringify(updated)
				});
				if (!response.ok) throw new Error("Failed to create message");
				const savedMessage = await response.json();
				setMessages(prev => [...prev, savedMessage])
				handleClearMessageForm();
			} catch (error) {
				console.error("Message save failed:", error);
			}
		}
	}

	const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>, type: "photo" | "sermon") => {
		const files = Array.from(e.target.files ?? []);
		if (type === "photo") {
			setSelectedPhotos(files);
		} else {
			setSelectedSermon(files[0] ?? null);
		}
	}
	const handleSubmitFiles = async (e: React.FormEvent<HTMLFormElement>, fileType: "photo" | "sermon") => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData();
    let endpoint = "";

    if (fileType === "photo") {
        if (selectedPhotos.length === 0 || selectedPhotos.length > 5) return;
        selectedPhotos.forEach(photo => formData.append("files", photo));
        endpoint = "/api/photos";
    } else {
        if (!selectedSermon) return;
        formData.append("file", selectedSermon);
        endpoint = "/api/sermons";
    }
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) throw new Error("File upload failed")

        const data = await response.json();

        if (fileType === "photo") {
            setPhotos(prev => [...data, ...prev]);
            setSelectedPhotos([]);
        } else {
            setSermons(prev => [data, ...prev]);
            setSelectedSermon(null);
        }
        form.reset();
    } catch (error) {
        console.error("Upload failed:", error);
    }
	};	

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, fileType: "photo" | "message" | "sermon", id: number) => {
		e.stopPropagation()

		const confirmed = window.confirm("정말 삭제하시겠습니까?");
  	if (!confirmed) return;

		let endpoint = "";
		if (fileType === 'photo') {
			endpoint = '/api/photos'
		} else if (fileType === 'message') {
			endpoint = '/api/messages'
		} else {
			endpoint = '/api/sermons'
		}

		try {
			const response = await fetch(`${endpoint}/${id}`, {
					method: "DELETE",
					credentials: "include",
			});

      if (!response.ok) throw new Error("Item deletion failed")
			
			if (fileType === 'photo') {
				setPhotos(prev => prev.filter(photo => photo.id !== id));
			} else if (fileType === 'message') {
				setMessages(prev => prev.filter(message => message.id !== id));
			} else {
				setSermons(prev => prev.filter(sermon => sermon.id !== id));
			}
		} catch (error) {
			console.error("Failed to delete item.", error)
		}
	}

	const messageTiles = messages.map(messageData => (
		<div key={messageData.id} className='messageTile' onClick={() => handleSelectMessage(messageData)}>
			<button type='button' className='redX message' onClick={(e) => handleDelete(e, 'message', messageData.id)}>×</button>
			<h3>{messageData.title}</h3>
		</div>
	))

	const photoThumbs = photos.map(photo => (
		<div key={photo.id} className='photoThumb'>
			<button type='button' className='redX photo' onClick={(e) => handleDelete(e, 'photo', photo.id)}>×</button>
			<img src={photo.url} alt={photo.caption || '교회 사진'}></img>
		</div>
	))

	const sermonThumbs = sermons.map(sermon => (
		<div key={sermon.id} className='sermonThumb'>
			<button type='button' className='redX sermon' onClick={(e) => handleDelete(e, 'sermon', sermon.id)}>×</button>
			<a href={sermon.url} target="_blank" rel="noopener noreferrer">
				<div className="pptIcon">PPT</div>
				<p>{sermon.title}</p>
			</a>
		</div>
	))

	return (
		<div className='mainPage admin'>
			<div className='child child1'>
				<h3 className='sectionHeading'>이 목사님, 환영합니다!</h3>
				<div className='formAndHistory'>
					<form className='createMessageForm' onSubmit={handleSubmitMessage}>
						<label htmlFor='title'>말씀 제목</label>
						<input type='text' required id='title' name='title' placeholder='말씀 제목' onChange={handleChangeMessage} value={messageForm.title}></input>
						<label htmlFor='date'>날짜</label>
						<input type='date' required id='date' name='date' onChange={handleChangeMessage} value={messageForm.date}></input>
						<label htmlFor='message'>목회자의 말씀</label>
						<textarea id='message' required name='message' onChange={handleChangeMessage} value={messageForm.message}></textarea>
						<div className='formBtnBox'>
							<button type='submit' className='pageBtn'>저장하기</button>
							<button type='button' className='pageBtn' onClick={handleClearMessageForm}>취소하기</button>
						</div>
					</form>
					<div className='messageTileBox'>
						{messageTiles}
					</div>
				</div>	
			</div>
			<div className='child child2'>
				<h3 className='sectionHeading'>교회 사진 갤러리</h3>
				<form className='photoForm' onSubmit={(e) => handleSubmitFiles(e, 'photo')}>
					<label htmlFor='photos'>
						{selectedPhotos.length
							? `${selectedPhotos.length} 개의 사진 선택됨`
							: "사진을 선택하세요"}
					</label>
					<input id='photos' name='photos' type='file' accept="image/jpeg,image/png,image/webp" multiple className='photoFileInput' onChange={(e) => handleChangeFiles(e, "photo")}></input>
					<button type='submit' className='pageBtn'>사진 업로드</button>
				</form>
				<div className='photoGallery'>
					{photoThumbs}
				</div>
			</div>
			<div className='child child3'>
				<h3 className='sectionHeading'>설교 파워 포인트</h3>
				<form className='photoForm' onSubmit={(e) => handleSubmitFiles(e, 'sermon')}>
					<label htmlFor='ppt'>
						{selectedSermon
							? selectedSermon.name
							: "파워포인트를 선택하세요"}
					</label>
					<input id='ppt' name='ppt' type='file' accept='.ppt, .pptx' className='photoFileInput' onChange={(e) => handleChangeFiles(e, "sermon")} required></input>
					<button type='submit' className='pageBtn'>설교 업로드</button>
				</form>
				<div className='sermonGallery'>
					{sermonThumbs}
				</div>
			</div>
		</div>
	)
}

export default Admin;