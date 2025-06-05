import React from 'react';
import PlayersList from '../components/players/PlayersList';

const Players: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Players Database</h2>
      <PlayersList />
    </div>
  );
};

export default Players;