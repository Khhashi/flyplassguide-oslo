import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('kaller onPress når den trykkes', async () => {
    const onPress = jest.fn();
    await render(<Button label="Finn" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Finn' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('viser sekundærknapp med samme tekst', async () => {
    await render(<Button label="Se et eksempel" variant="secondary" onPress={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Se et eksempel' })).toBeOnTheScreen();
  });
});

describe('Button – størrelse', () => {
  it('er minst 56 px høy, så den er lett å treffe', async () => {
    await render(<Button label="Finn" onPress={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Finn' })).toHaveStyle({ minHeight: 56 });
  });
});
