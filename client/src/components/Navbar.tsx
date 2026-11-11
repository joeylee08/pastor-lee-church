import { NavLink, useLocation } from "react-router-dom";
import { CloudSun } from "lucide-react"

const NavBar = () => {
	const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
	
	return (
		<nav className='navWrapper'>
			<div className='nav'>
				<NavLink to="/" className='titleAndLogo'>
					<h1 className='title'>반석 장로 교회</h1>
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
							<NavLink to="/messages">목회자의 글</NavLink>
							<NavLink to="/sermons">지난 설교</NavLink>
							<NavLink to="/contact">교회 안내</NavLink>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}

export default NavBar