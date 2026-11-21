import { act, renderHook } from '@testing-library/react-native';

import * as api from '../api';
import { useFlight } from '../useFlight';

describe('useFlight', () => {
  it('venter, og gir så svaret for riktig flynummer', async () => {
    let answer: (value: api.FlightResult) => void = () => {};
    jest.spyOn(api, 'fetchFlight').mockReturnValue(new Promise((resolve) => (answer = resolve)));

    const { result } = await renderHook(() => useFlight('XX999'));
    expect(result.current).toBeNull();

    await act(async () => answer({ kind: 'not_found' }));
    expect(result.current).toEqual({ kind: 'not_found' });
    expect(api.fetchFlight).toHaveBeenCalledWith('XX999');
  });
});
