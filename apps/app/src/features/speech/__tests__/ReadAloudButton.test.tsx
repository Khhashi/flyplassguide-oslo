import { fireEvent, render, screen } from '@testing-library/react-native';
import * as Speech from 'expo-speech';

import { ReadAloudButton } from '../ReadAloudButton';

jest.mock('expo-speech', () => ({ speak: jest.fn(), stop: jest.fn() }));

describe('ReadAloudButton', () => {
  it('leser teksten høyt på norsk', async () => {
    await render(<ReadAloudButton text="Gå til gate A12." />);

    await fireEvent.press(screen.getByRole('button', { name: 'Les opp' }));

    expect(Speech.stop).toHaveBeenCalled();
    expect(Speech.speak).toHaveBeenCalledWith('Gå til gate A12.', { language: 'nb-NO' });
  });
});
