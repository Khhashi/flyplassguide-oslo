import { fireEvent, render, screen } from '@testing-library/react-native';

import { ShortcutGrid } from '../ShortcutGrid';

describe('ShortcutGrid', () => {
  it('åpner riktig side for hver snarvei', async () => {
    const onOpen = jest.fn();
    await render(<ShortcutGrid onOpen={onOpen} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Finn gaten min' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Toaletter' }));

    expect(onOpen).toHaveBeenNthCalledWith(1, '/my-flight');
    expect(onOpen).toHaveBeenNthCalledWith(2, '/map?kategori=toilet');
  });
});
