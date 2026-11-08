import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Media from "./pages/Media";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/media" element={<Media />} />
			<Route path="/messages" element={<Messages />} />
			<Route path="/contact" element={<Contact />} />
		</Routes>
	);
}

export default App