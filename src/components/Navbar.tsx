import { NavLink } from 'react-router-dom';
import { Home, Radio, Users, Tv, Gamepad2, ShoppingBag, Download } from 'lucide-react';
import { matches } from '../data/matches';
import { useCoins } from '../context/CoinContext';
import { useEffect, useState } from 'react';

const liveCount = matches.filter(m => m.status === 'live').length;

const navItems = [
  { to: '/', label: 'Startseite', icon: Home },
  { to: '/live', label: 'Live', icon: Radio, badge: liveCount },
  { to: '/mannschaften', label: 'Mannschaften', icon: Users },
  { to: '/live-ansehen', label: 'Live ansehen', icon: Tv },
  { to: '/spiel', label: 'Spiel', icon: Gamepad2 },
  { to: '/shop', label: 'Shop', icon: ShoppingBag },
];

export default function Navbar() {
  const { state } = useCoins();
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    const { outcome } = await (installPrompt as any).userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <>
      {/* Sidebar for md+ */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#12121a] border-r border-[#22223a] fixed left-0 top-0 z-30">
        <div className="p-6 border-b border-[#22223a]">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚽</span>
            <div>
              <h1 className="text-lg font-bold text-white">Sport TV</h1>
              <p className="text-xs text-[#6c63ff]">Dein Sporterlebnis</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                ${isActive
                  ? 'bg-[#6c63ff]/20 text-[#6c63ff] border border-[#6c63ff]/30'
                  : 'text-slate-400 hover:bg-[#1a1a27] hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
              {badge != null && badge > 0 && (
                <span className="ml-auto flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  <span className="live-dot w-1.5 h-1.5" />
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-[#22223a] space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-amber-400 font-bold text-sm">🪙 {state.coins}</span>
            <span className="text-slate-600 text-xs">Münzen</span>
          </div>
          {!installed && installPrompt && (
            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5a52e0] text-white text-sm font-semibold py-2 px-3 rounded-xl transition-colors"
            >
              <Download size={16} />
              App installieren
            </button>
          )}
          <p className="text-xs text-slate-600 text-center">© 2025 Sport TV</p>
        </div>
      </aside>

      {/* Bottom nav for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#12121a] border-t border-[#22223a] flex">
        {navItems.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 px-1 transition-colors relative
              ${isActive ? 'text-[#6c63ff]' : 'text-slate-500'}`
            }
          >
            <div className="relative">
              <Icon size={22} />
              {badge != null && badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Mobile install banner */}
      {!installed && installPrompt && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#6c63ff] flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚽</span>
            <div>
              <p className="text-white text-sm font-bold">Sport TV installieren</p>
              <p className="text-purple-200 text-xs">Als App auf dem Handy speichern</p>
            </div>
          </div>
          <button
            onClick={handleInstall}
            className="bg-white text-[#6c63ff] text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            Installieren
          </button>
        </div>
      )}
    </>
  );
}
