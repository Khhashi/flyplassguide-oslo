import { render, screen } from '@testing-library/react-native';

import { MapIllustration } from '../MapIllustration';

describe('MapIllustration', () => {
  it('er tydelig merket som illustrasjon og sier hvor ruten går', async () => {
    await render(<MapIllustration gate="A12" />);

    expect(screen.getByText(/Illustrasjon – ikke ekte informasjon/)).toBeOnTheScreen();
    expect(screen.getByLabelText('Illustrasjon av kart med rute til gate A12')).toBeOnTheScreen();
  });
});

describe('MapIllustration – ikoner', () => {
  it('gjør andre kategorier svakere når én er valgt', async () => {
    await render(<MapIllustration gate="A12" highlight="toilet" />);

    expect(screen.getAllByTestId('poi-toilet')[0]).toHaveStyle({ opacity: 1 });
    expect(screen.getAllByTestId('poi-food')[0]).toHaveStyle({ opacity: 0.3 });
  });
});
