import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import CarList from "./pages/CarList";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/carlist" Component={CarList} />
      </Routes>
    </Router>
  )
}

export default App
