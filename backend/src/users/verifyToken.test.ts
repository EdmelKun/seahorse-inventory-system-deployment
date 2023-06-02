import { Request, Response } from 'express';
import verifyToken from './verifyToken';

jest.mock('./makeToken');

describe('login.ts', () => {
  const mockResponse = {} as Response;
  mockResponse.status = jest.fn().mockReturnValue(mockResponse);
  mockResponse.json = jest.fn((input) => input);

  const mockRequest = {} as Request;
  describe('/verifyToken request and response', () => {
    it('works when token is valid', () => {
      mockRequest.headers = {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2V2aWVtYXIiLCJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SiG567cr5_otkcpiI-hvQiW3seFlJc-WWuUqEhXC9Cg',
      };
      process.env.TOKEN_SECRET = 'secret';

      return expect(
        verifyToken(mockRequest, mockResponse),
      ).resolves.toMatchObject({
        success: true,
        data: { username: 'joeviemar', id: 1, admin: true },
      });
    });
  });
});
