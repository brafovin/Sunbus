import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';

interface CoinState {
  coins: number;
  ownedEmojis: string[];
}

type CoinAction =
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'SPEND_COINS'; amount: number }
  | { type: 'BUY_EMOJI'; emoji: string; price: number };

const initialState: CoinState = {
  coins: 100,
  ownedEmojis: ['👍', '❤️', '⚽'],
};

function coinReducer(state: CoinState, action: CoinAction): CoinState {
  switch (action.type) {
    case 'ADD_COINS':
      return { ...state, coins: state.coins + action.amount };
    case 'SPEND_COINS':
      return { ...state, coins: Math.max(0, state.coins - action.amount) };
    case 'BUY_EMOJI':
      if (state.coins < action.price || state.ownedEmojis.includes(action.emoji)) return state;
      return {
        ...state,
        coins: state.coins - action.price,
        ownedEmojis: [...state.ownedEmojis, action.emoji],
      };
    default:
      return state;
  }
}

interface CoinContextValue {
  state: CoinState;
  dispatch: React.Dispatch<CoinAction>;
}

const CoinContext = createContext<CoinContextValue | null>(null);

const STORAGE_KEY = 'sportlive_coins';

export function CoinProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(coinReducer, initialState, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as CoinState;
    } catch {
      // ignore
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <CoinContext.Provider value={{ state, dispatch }}>{children}</CoinContext.Provider>;
}

export function useCoins(): CoinContextValue {
  const ctx = useContext(CoinContext);
  if (!ctx) throw new Error('useCoins must be used within CoinProvider');
  return ctx;
}
