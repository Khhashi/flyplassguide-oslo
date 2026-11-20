import { render, screen } from '@testing-library/react-native';

import { DemoBadge } from '../DemoBadge';

describe('DemoBadge', () => {
  it('merker demodata tydelig', async () => {
    await render(<DemoBadge source="demo" />);
    expect(screen.getByText(/Demodata/)).toBeOnTheScreen();
  });

  it('merker illustrasjoner tydelig', async () => {
    await render(<DemoBadge source="illustration" />);
    expect(screen.getByText(/Illustrasjon/)).toBeOnTheScreen();
  });

  it('viser ingen merking for verifiserte data', async () => {
    await render(<DemoBadge source="verified" />);
    expect(screen.queryByText(/ikke ekte/)).not.toBeOnTheScreen();
  });
});
