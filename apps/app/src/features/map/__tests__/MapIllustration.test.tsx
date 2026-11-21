import { render, screen } from '@testing-library/react-native';

import { MapIllustration } from '../MapIllustration';

describe('MapIllustration', () => {
  it('er tydelig merket som illustrasjon og sier hvor ruten går', async () => {
    await render(<MapIllustration gate="A12" />);

    expect(screen.getByText(/Illustrasjon – ikke ekte informasjon/)).toBeOnTheScreen();
    expect(screen.getByLabelText('Illustrasjon av kart med rute til gate A12')).toBeOnTheScreen();
  });
});
