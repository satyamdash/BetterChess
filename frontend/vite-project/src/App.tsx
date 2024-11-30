import { BrowserRouter, Routes, Route  } from "react-router-dom";
import {Game} from './components/Game';
import { Landing } from "./components/Landing";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App
