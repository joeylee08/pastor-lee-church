import { NavLink } from "react-router-dom";
import { Cloud, CloudSun } from "lucide-react"

const NavBar = () => {
	return (
		<nav className='navWrapper'>
			<div className='nav'>
				<div className='titleAndLogo'>
				<h1 className='title'>주님의 향기 교회</h1>
				<CloudSun size={60} className='titleLogo' />
			</div>
			<div className='linksList'>
				<NavLink to="/">홈</NavLink>
				<NavLink to="/media">미디어</NavLink>
				<NavLink to="/messages">말씀과 묵상</NavLink>
				<NavLink to="/contact">교회 안내</NavLink>
			</div>
			</div>
		</nav>
	)
}

export default NavBar