const Contact = () => {
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

			</div>
		</div>
	);
}

export default Contact