import { fireEvent, render, screen } from '@testing-library/react-native';

import { colors } from '@/theme/tokens';

import { TextField } from '../TextField';

describe('TextField', () => {
  it('får blå ramme når man trykker i feltet', async () => {
    await render(<TextField label="Flynummer" />);
    const input = screen.getByLabelText('Flynummer');

    await fireEvent(input, 'focus');
    expect(input).toHaveStyle({ borderColor: colors.primary.DEFAULT });

    await fireEvent(input, 'blur');
    expect(input).not.toHaveStyle({ borderColor: colors.primary.DEFAULT });
  });
});
