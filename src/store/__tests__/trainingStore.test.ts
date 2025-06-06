import { useTrainingStore } from '../trainingStore';

describe('trainingStore', () => {
  beforeEach(() => {
    useTrainingStore.setState({ trainings: [] });
    localStorage.clear();
  });

  const sample = {
    date: '2024-01-01',
    title: 'Session',
    duration: 60,
    intensity: 'medium' as const,
    type: 'fitness' as const,
  };

  test('adds a training', () => {
    useTrainingStore.getState().addTraining(sample);
    const trainings = useTrainingStore.getState().trainings;
    expect(trainings).toHaveLength(1);
    expect(trainings[0].title).toBe('Session');
    expect(trainings[0].id).toBeDefined();
    const stored = JSON.parse(localStorage.getItem('tennis-tracker-trainings')!);
    expect(stored).toHaveLength(1);
  });

  test('updates a training', () => {
    useTrainingStore.getState().addTraining(sample);
    const id = useTrainingStore.getState().trainings[0].id;
    useTrainingStore.getState().updateTraining(id, { title: 'Updated' });
    expect(useTrainingStore.getState().trainings[0].title).toBe('Updated');
  });

  test('deletes a training', () => {
    useTrainingStore.getState().addTraining(sample);
    const id = useTrainingStore.getState().trainings[0].id;
    useTrainingStore.getState().deleteTraining(id);
    expect(useTrainingStore.getState().trainings).toHaveLength(0);
    const stored = JSON.parse(localStorage.getItem('tennis-tracker-trainings')!);
    expect(stored).toHaveLength(0);
  });
});
