import { Message } from "../types/Message";
import { useState, useEffect } from 'react'

const Messages = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch("/api/messages");
				if (!response.ok) throw new Error("Failed to fetch messages")

				const data: Message[] = await response.json();
				setMessages(data);
			} catch (error) {
				console.error("Failed to fetch Messages:", error);
			}
		};
		fetchMessages();
	}, []);

	const messageBodies = messages.map(messageData => (
		<div key={messageData.id} className='messageBody'>
			<h3>{messageData.title}</h3>
			<p>{messageData.date}</p>
			<p>{messageData.message}</p>
		</div>
	))

	return (
		<div className='mainPage messages'>
			<div className='child child1'>
				<h3 className='sectionHeading'>목회자의 글</h3>
				<div className='renderedMessages'>{messageBodies}</div>
			</div>
		</div>
	);
}

export default Messages