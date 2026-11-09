import { useState } from 'react'

const Contact = () => {
	const [form, setForm] = useState({
		name: '',
		email: ''
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setForm(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div className='mainPage contact'>
			<div className='child child1'>
				<div className='child1a'>
						<h4>교회 주소 / 연락</h4>
						<p>10900 Alondra Blvd, Cerritos CA</p>
						<p>(213) 555 2342</p>
						<p>aromaofchrist@gmail.com</p>
						<br/>
						<h4>예배 시간</h4>
						<p>주일 예배: 오전 10시</p>
						<p>수요 예배: 오후 7시</p>
						<br/>
						<button type='button' className='pageBtn'>길찾기</button>
				</div>
				<img className='googleMap' src='/google-map-image.png' alt='google map image'></img>
			</div>
			<div className='child child2'>
				<h3 className='sectionHeading'>교회 소식 구독하기</h3>
				<p>교회의 새로운 소식과 말씀을 이메일로 받아보세요.</p>
				<form className='subscribeForm' onSubmit={handleSubmit}>
					<label htmlFor='name'>이름</label>
					<input id='name' name='name' value={form.name} placeholder="이름" onChange={handleChange}></input>
					<label htmlFor='email'>이매일</label>
					<input id='email' name='email' type='email' value={form.email} placeholder="이메일" onChange={handleChange}></input>
					<button type='submit' className='subscribeBtn'>구독하기</button>
				</form>
			</div>
		</div>
	);
}

export default Contact