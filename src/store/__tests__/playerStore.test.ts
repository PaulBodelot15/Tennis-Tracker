import { usePlayerStore } from '../playerStore';

describe('playerStore', () => {
  beforeEach(() => {
    usePlayerStore.setState({ players: [] });
    localStorage.clear();
  });

  test('adds a player', () => {
    usePlayerStore.getState().addPlayer({ name: 'John Doe' });
    const players = usePlayerStore.getState().players;
    expect(players).toHaveLength(1);
    expect(players[0].name).toBe('John Doe');
    expect(players[0].id).toBeDefined();
    const stored = JSON.parse(localStorage.getItem('tennis-tracker-players')!);
    expect(stored).toHaveLength(1);
  });

  test('updates a player', () => {
    usePlayerStore.getState().addPlayer({ name: 'John' });
    const id = usePlayerStore.getState().players[0].id;
    usePlayerStore.getState().updatePlayer(id, { name: 'Jane' });
    expect(usePlayerStore.getState().players[0].name).toBe('Jane');
  });

  test('deletes a player', () => {
    usePlayerStore.getState().addPlayer({ name: 'John' });
    const id = usePlayerStore.getState().players[0].id;
    usePlayerStore.getState().deletePlayer(id);
    expect(usePlayerStore.getState().players).toHaveLength(0);
    const stored = JSON.parse(localStorage.getItem('tennis-tracker-players')!);
    expect(stored).toHaveLength(0);
  });
});
