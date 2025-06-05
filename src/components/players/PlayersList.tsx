import React, { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import PlayerCard from './PlayerCard';
import PlayerForm from './PlayerForm';
import EmptyState from '../ui/EmptyState';

const PlayersList: React.FC = () => {
  const { players } = usePlayerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const filteredPlayers = players.filter((player) => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">Players Database</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search players..."
              className="form-input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            <span>Add Player</span>
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="card mb-6">
          <PlayerForm onClose={() => setShowForm(false)} />
        </div>
      )}
      
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={Users}
            title="No players found"
            description={searchQuery ? "Try a different search term" : "Add your first opponent to get started"}
            action={
              <button className="btn btn-primary\" onClick={() => setShowForm(true)}>
                Add a player
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default PlayersList;