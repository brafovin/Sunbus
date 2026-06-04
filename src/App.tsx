import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import Teams from './pages/Teams';
import LiveWatch from './pages/LiveWatch';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        {/* Content area — offset by sidebar on md+ */}
        <main className="md:ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LiveScores />} />
            <Route path="/mannschaften" element={<Teams />} />
            <Route path="/live-ansehen" element={<LiveWatch />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
