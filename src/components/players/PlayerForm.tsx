import React, { useState } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { Player } from '../../types';

interface PlayerFormProps {
  player?: Player;
  onClose: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, onClose }) => {
  const { addPlayer, updatePlayer } = usePlayerStore();
  const [name, setName] = useState(player?.name || '');
  const [rank, setRank] = useState(player?.rank || '');
  const [playingStyle, setPlayingStyle] = useState(player?.playingStyle || '');
  const [strengths, setStrengths] = useState(player?.strengths?.join(', ') || '');
  const [weaknesses, setWeaknesses] = useState(player?.weaknesses?.join(', ') || '');
  const [notes, setNotes] = useState(player?.notes || '');
  const [lastPlayed, setLastPlayed] = useState(
    player?.lastPlayed 
      ? new Date(player.lastPlayed).toISOString().split('T')[0]
      : ''
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const strengthsArray = strengths
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');
      
    const weaknessesArray = weaknesses
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');
    
    const playerData = {
      name,
      rank,
      playingStyle,
      strengths: strengthsArray,
      weaknesses: weaknessesArray,
      notes,
      lastPlayed: lastPlayed ? new Date(lastPlayed).toISOString() : undefined
    };
    
    if (player) {
      updatePlayer(player.id, playerData);
    } else {
      addPlayer(playerData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input
          id="name"
          type="text"
          className="form-input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Roger Federer"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rank" className="form-label">Rank</label>
          <input
            id="rank"
            type="text"
            className="form-input w-full"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="e.g., 4.5 NTRP or #3 Club"
          />
        </div>
        
        <div>
          <label htmlFor="playingStyle" className="form-label">Playing Style</label>
          <input
            id="playingStyle"
            type="text"
            className="form-input w-full"
            value={playingStyle}
            onChange={(e) => setPlayingStyle(e.target.value)}
            placeholder="e.g., Aggressive baseliner"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="strengths" className="form-label">Strengths (comma separated)</label>
          <input
            id="strengths"
            type="text"
            className="form-input w-full"
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            placeholder="e.g., Forehand, serve, volleys"
          />
        </div>
        
        <div>
          <label htmlFor="weaknesses" className="form-label">Weaknesses (comma separated)</label>
          <input
            id="weaknesses"
            type="text"
            className="form-input w-full"
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            placeholder="e.g., Backhand, movement, second serve"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="form-label">Notes</label>
        <textarea
          id="notes"
          className="form-input w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Strategy notes, observations, etc."
          rows={4}
        />
      </div>
      
      <div>
        <label htmlFor="lastPlayed" className="form-label">Last Played (optional)</label>
        <input
          id="lastPlayed"
          type="date"
          className="form-input w-full"
          value={lastPlayed}
          onChange={(e) => setLastPlayed(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {player ? 'Update' : 'Add'} Player
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;