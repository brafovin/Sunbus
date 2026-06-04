import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';

export interface PlayerCard {
  id: string;
  name: string;
  team: string;
  teamEmoji: string;
  position: string;
  rating: number;
  pace: number;
  shooting: number;
  passing: number;
  defending: number;
  rarity: 'normal' | 'rare' | 'epic' | 'legend';
  price: number;
  image: string; // emoji avatar
}

export interface CustomCard {
  id: string;
  name: string;
  position: string;
  imageData: string; // base64 PNG
  createdAt: number;
}

interface CoinState {
  coins: number;
  ownedEmojis: string[];
  ownedCards: string[]; // card ids
  customCards: CustomCard[];
}

type CoinAction =
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'SPEND_COINS'; amount: number }
  | { type: 'BUY_EMOJI'; emoji: string; price: number }
  | { type: 'BUY_CARD'; cardId: string; price: number }
  | { type: 'ADD_CUSTOM_CARD'; card: CustomCard }
  | { type: 'DELETE_CUSTOM_CARD'; id: string };

const initialState: CoinState = {
  coins: 100,
  ownedEmojis: ['👍', '❤️', '⚽'],
  ownedCards: [],
  customCards: [],
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
    case 'BUY_CARD':
      if (state.coins < action.price || state.ownedCards.includes(action.cardId)) return state;
      return {
        ...state,
        coins: state.coins - action.price,
        ownedCards: [...state.ownedCards, action.cardId],
      };
    case 'ADD_CUSTOM_CARD':
      return { ...state, customCards: [...state.customCards, action.card] };
    case 'DELETE_CUSTOM_CARD':
      return { ...state, customCards: state.customCards.filter(c => c.id !== action.id) };
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
      if (saved) {
        const parsed = JSON.parse(saved) as CoinState;
        return { ...initialState, ...parsed };
      }
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
