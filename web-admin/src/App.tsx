import React, { useEffect } from "react"
import "./App.css"
import Dashboard from "./pages/Dashboard"

function App() {
    
	useEffect(() => {
		document.title = "Tap Network"
	}, [])
	
	return (
		<Dashboard />
	)
}

export default App
