import { Request, Response } from 'express';
import login from './login';
import makeToken from './makeToken';

jest.mock('./makeToken');

describe('login.ts', () => {
  const mockMakeToken = makeToken as jest.MockedFunction<typeof makeToken>;
  afterEach(() => {
    mockMakeToken.mockReset();
  });

  const mockResponse = {} as Response;
  mockResponse.header = jest.fn().mockReturnValue(mockResponse);
  mockResponse.json = jest.fn((input) => input);

  const request = {
    body: {
      username: 'jonny',
      password: '123',
    },
  } as Request;

  describe('/login request and response', () => {
    it('Works when token is generated', async () => {
      mockMakeToken.mockResolvedValue({
        token: 'token-123',
        id: 1,
        username: 'jonny',
        admin: false,
      });

      await expect(login(request, mockResponse)).resolves.toEqual({
        success: true,
        token: 'Bearer token-123',
        data: {
          id: 1,
          username: 'jonny',
          admin: false,
        },
      });
    });
    it('Works when no token is generated', async () => {
      mockMakeToken.mockResolvedValue(undefined);

      await expect(login(request, mockResponse)).resolves.toEqual({
        success: false,
        error: 'Invaild credential',
      });
    });
  });
});
