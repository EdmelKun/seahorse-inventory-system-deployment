// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Sample test', () => {
  it('works on fetching login with right user', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        success: true,
      }),
    );

    await expect(
      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'user1',
          password: '123',
        }),
      }).then((result) => result.json()),
    ).resolves.toEqual({
      success: true,
    });
  });
  it('works on fetching login with wrong user', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ sucess: false, error: 'Invalid credential' }),
    );

    await expect(
      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'user1',
          password: '123',
        }),
      }).then((result) => result.json()),
    ).resolves.toEqual({ sucess: false, error: 'Invalid credential' });
  });
});
