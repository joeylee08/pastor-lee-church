import { useState } from 'react'

const Contact = () => {
	
	return (
		<div className='mainPage contact'>
			<div className='child child1'>
				<div className='child1a'>
						<h4>교회 주소 / 연락</h4>
						<p>3242 W 8th St., Los Angeles, CA</p>
						<p>(213) 454 8020</p>
						<a href="mailto:waterlifejohn@gmail.com">
							waterlifejohn@gmail.com
						</a>
						<br/>
						<br/>
						<br/>
						<h4>예배 시간</h4>
						<p>주일 예배: 오전 11시</p>
						<p>새벽 기도: 오전 6시 (화, 토)</p>
						<br/>
						<a
							href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("3242 W 8th St., Los Angeles, CA")}`}
							target="_blank"
							rel="noopener noreferrer"
							className="pageBtn"
						>
							길찾기
						</a>
				</div>
				<img className='googleMap' src='/google-map-image.png' alt='google map image'></img>
			</div>
		</div>
	);
}

export default Contact