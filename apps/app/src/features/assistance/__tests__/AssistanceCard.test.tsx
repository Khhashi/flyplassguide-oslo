import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';

import { AVINOR_ASSISTANCE_URL, AssistanceCard } from '../AssistanceCard';

describe('AssistanceCard', () => {
  it('åpner Avinors side om assistanse', async () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    await render(<AssistanceCard />);

    await fireEvent.press(screen.getByRole('button', { name: 'Trenger du hjelp?' }));

    expect(openURL).toHaveBeenCalledWith(AVINOR_ASSISTANCE_URL);
  });
});
