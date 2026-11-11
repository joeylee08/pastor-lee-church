import { useState } from 'react'

const Contact = () => {
	
	return (
		<div className='mainPage contact'>
			<div className='child child1'>
				<div className='child1a'>
						<h4>교회 주소 / 연락</h4>
						<p>3242 W 8th St., Los Angeles, CA</p>
						<p>(213) 454 8020</p>
						<p>waterlifejohn@gmail.com</p>
						<br/>
						<h4>예배 시간</h4>
						<p>주일 예배: 오전 11시</p>
						<p>새벽 기도: 오전 6시 (화, 토)</p>
						<br/>
						<button type='button' className='pageBtn'>길찾기</button>
				</div>
				<img className='googleMap' src='/google-map-image.png' alt='google map image'></img>
			</div>
		</div>
	);
}

export default Contact