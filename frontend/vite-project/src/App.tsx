import { BrowserRouter, Routes, Route  } from "react-router-dom";
import {Game} from './screens/Game';
import { Landing } from "./screens/Landing";

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
