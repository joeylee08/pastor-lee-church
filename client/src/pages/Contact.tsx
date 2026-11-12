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
				<div className="googleMap">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.467059171595!2d-118.299024!3d34.0575395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c77e242eea05%3A0x22b73ccc788aa50d!2s3242%20W%208th%20St%2C%20Los%20Angeles%2C%20CA%2090005!5e0!3m2!1sen!2sus!4v1794446382347!5m2!1sen!2sus"
						title="교회 위치"
						allowFullScreen
						loading="lazy"
						referrerPolicy="strict-origin-when-cross-origin"
					/>
				</div>
			</div>
		</div>
	);
}

export default Contact