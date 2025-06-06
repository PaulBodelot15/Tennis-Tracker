import { create } from 'zustand';
import { Player } from '../types';

interface PlayerState {
  players: Player[];
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, updates: Partial<Omit<Player, 'id'>>) => void;
  deletePlayer: (id: string) => void;
}

const loadPlayers = (): Player[] => {
  const saved = localStorage.getItem('tennis-tracker-players');
  return saved ? JSON.parse(saved) : [];
};

const savePlayers = (players: Player[]) => {
  localStorage.setItem('tennis-tracker-players', JSON.stringify(players));
};

export const usePlayerStore = create<PlayerState>((set) => ({
  players: loadPlayers(),
  addPlayer: (player) => {
    const newPlayer: Player = {
      ...player,
      id: crypto.randomUUID(),
    };

    set((state) => {
      const updatedPlayers = [...state.players, newPlayer];
      savePlayers(updatedPlayers);
      return { players: updatedPlayers };
    });
  },
  updatePlayer: (id, updates) => {
    set((state) => {
      const updatedPlayers = state.players.map((player) => 
        player.id === id ? { ...player, ...updates } : player
      );
      savePlayers(updatedPlayers);
      return { players: updatedPlayers };
    });
  },
  deletePlayer: (id) => {
    set((state) => {
      const updatedPlayers = state.players.filter((player) => player.id !== id);
      savePlayers(updatedPlayers);
      return { players: updatedPlayers };
    });
  },
}));

