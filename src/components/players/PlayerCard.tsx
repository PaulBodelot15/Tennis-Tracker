import React, { useState } from 'react';
import { Edit, Trash2, MoreVertical, User } from 'lucide-react';
import { Player } from '../../types';
import { usePlayerStore } from '../../store/playerStore';
import PlayerForm from './PlayerForm';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const { deletePlayer } = usePlayerStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  
  if (editing) {
    return (
      <div className="card">
        <PlayerForm player={player} onClose={() => setEditing(false)} />
      </div>
    );
  }
  
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
            <User size={20} />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{player.name}</h3>
            {player.rank && <p className="text-sm text-gray-500 dark:text-gray-400">Rank: {player.rank}</p>}
          </div>
        </div>
        
        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical size={18} className="text-gray-500" />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  deletePlayer(player.id);
                  setMenuOpen(false);
                }}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {player.playingStyle && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Playing Style</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{player.playingStyle}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strengths</h4>
          {player.strengths && player.strengths.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              {player.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">No strengths listed</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weaknesses</h4>
          {player.weaknesses && player.weaknesses.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              {player.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">No weaknesses listed</p>
          )}
        </div>
      </div>
      
      {player.notes && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">{player.notes}</p>
        </div>
      )}
      
      {player.lastPlayed && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last played: {new Date(player.lastPlayed).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
