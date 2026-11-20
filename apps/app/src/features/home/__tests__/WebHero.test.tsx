import { fireEvent, render, screen } from '@testing-library/react-native';

import { WebHero } from '../WebHero';

describe('WebHero', () => {
  it('viser velkomst og flysøk oppå bildet', async () => {
    const onSearch = jest.fn();
    await render(<WebHero onSearch={onSearch} />);

    expect(screen.getByRole('header', { name: 'Velkommen til Gardermoen' })).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByLabelText('Flynummer'), 'sk 4035');
    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));

    expect(onSearch).toHaveBeenCalledWith('SK4035');
  });
});
