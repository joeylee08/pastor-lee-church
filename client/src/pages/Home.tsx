import {BookOpen, Heart, House } from 'lucide-react'
import { NavLink } from 'react-router-dom';

const Home = () => {
	return (
		<div className='mainPage home'>
			<div className='child child1'>
				<p>믿음 · 사랑 · 교제</p>
				<h3>함께 믿음으로 성장하는 곳.</h3>
				<p>믿음과 교제, 그리고 지역사회를 섬기는 일에 함께해 주세요.</p>
				<NavLink to='/contact' className='pageBtn'>문의하기</NavLink>
			</div>
			<div className='child child2'>
				<img src='/church1.png' alt='church1' className='homeImg'></img>
				<img src='/church2.png' alt='church2' className='homeImg'></img>
				<img src='/church3.png' alt='church3' className='homeImg'></img>
			</div>
			<div className='child child3'>
				<h2 className='sectionHeading'>우리 교회의 핵심 가치</h2>
				<div className='valuesBox'>
					<div className='valuesCard'>
						<BookOpen className='homeIcon' size={40}/>
						<h4>믿음</h4>
					</div>
					<div className='valuesCard'>
						<Heart className='homeIcon' size={40}/>
						<h4>사랑</h4>
					</div>
					<div className='valuesCard'>
						<House className='homeIcon' size={40}/>
						<h4>교제</h4>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home