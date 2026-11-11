import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Media from "./pages/Media";
import Messages from "./pages/Messages";
import Sermons from "./pages/Sermons";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin"
import NavBar from "./components/Navbar"
import Footer from "./components/Footer";

const App = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/media" element={<Media />} />
				<Route path="/messages" element={<Messages />} />
				<Route path="sermons" element={<Sermons />} />
				<Route path="/contact" element={<Contact />} />
				<Route path='/admin'element={<Admin />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App