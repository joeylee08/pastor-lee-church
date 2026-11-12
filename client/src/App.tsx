import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import Home from "./pages/Home";
import Media from "./pages/Media";
import Messages from "./pages/Messages";
import Sermons from "./pages/Sermons";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin"
import NavBar from "./components/Navbar"
import Footer from "./components/Footer";
import Login from "./pages/Login";

const App = () => {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/session", { credentials: "include" });

        if (!response.ok) {
          throw new Error("Session check failed");
        }

        const data = await response.json();
        setAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuthenticated(false);
      }
    };

    checkSession();
  }, []);

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/logout", {
				method: "POST",
				credentials: "include",
			});

			if (!response.ok) throw new Error("Logout failed");

			setAuthenticated(false);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className='app'>
			<NavBar onLogout={handleLogout}/>
			<main>
        {authenticated === null ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/media" element={<Media />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/admin"
              element={
                authenticated
                  ? <Admin />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/login"
              element={
                authenticated
                  ? <Navigate to="/admin" replace />
                  : <Login onLogin={() => setAuthenticated(true)} />
              }
            />
          </Routes>
        )}
      </main>
			<Footer />
		</div>
	);
}

export default App