import { NavLink } from 'react-router-dom';
import { Home, Radio, Users, Tv, Gamepad2, ShoppingBag } from 'lucide-react';
import { matches } from '../data/matches';
import { useCoins } from '../context/CoinContext';

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

  return (
    <>
      {/* Sidebar for md+ */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#12121a] border-r border-[#22223a] fixed left-0 top-0 z-30">
        <div className="p-6 border-b border-[#22223a]">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚽</span>
            <div>
              <h1 className="text-lg font-bold text-white">SportLive</h1>
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
        <div className="p-4 border-t border-[#22223a]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-amber-400 font-bold text-sm">🪙 {state.coins}</span>
            <span className="text-slate-600 text-xs">Münzen</span>
          </div>
          <p className="text-xs text-slate-600 text-center">© 2024 SportLive</p>
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
    </>
  );
}
