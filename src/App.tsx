import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import Teams from './pages/Teams';
import LiveAnsehen from './pages/LiveAnsehen';
import Spiel from './pages/Spiel';
import Shop from './pages/Shop';
import Karten from './pages/Karten';
import { CoinProvider } from './context/CoinContext';

export default function App() {
  return (
    <BrowserRouter>
      <CoinProvider>
        <div className="min-h-dvh bg-[#0a0a0f]">
          <Navbar />
          <main className="md:ml-64 min-h-dvh">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/live" element={<LiveScores />} />
              <Route path="/mannschaften" element={<Teams />} />
              <Route path="/live-ansehen" element={<LiveAnsehen />} />
              <Route path="/spiel" element={<Spiel />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/karten" element={<Karten />} />
            </Routes>
          </main>
        </div>
      </CoinProvider>
    </BrowserRouter>
  );
}
