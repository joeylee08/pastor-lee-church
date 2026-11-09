import { NavLink, useLocation } from "react-router-dom";
import { CloudSun } from "lucide-react"

const NavBar = () => {
	const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
	
	return (
		<nav className='navWrapper'>
			<div className='nav'>
				<NavLink to="/" className='titleAndLogo'>
					<h1 className='title'>주님의 향기 교회</h1>
					<CloudSun size={60} className='titleLogo' />
				</NavLink>
				<div className='linksList'>
					{isAdmin ? (
						<>
							<button type="button" className='pageBtn logout'>로그아웃</button>
						</>
					) : (
						<>
							<NavLink to="/">홈</NavLink>
							<NavLink to="/media">미디어</NavLink>
							<NavLink to="/messages">말씀과 묵상</NavLink>
							<NavLink to="/contact">교회 안내</NavLink>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}

export default NavBar