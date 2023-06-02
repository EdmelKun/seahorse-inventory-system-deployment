// import { Response, Request } from 'express';
// import jwt, { VerifyErrors } from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// const verifyToken = (req: Request, res: Response) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   const x = jwt.verify('kkkkkkk', process.env.TOKEN_SECRET ?? 'secret');
//   console.log(x);

//   if (token) {
//     return jwt.verify(
//       token,
//       process.env.TOKEN_SECRET ?? 'secret',
//       (err: VerifyErrors | null, decoded: Object | undefined) => {
//         if (err) {
//           return res.status(401).json({ success: false });
//         }
//         return res.json({ success: true, ...decoded });
//       },
//     );
//   }
//   return res.status(401).json({ success: false });
// };

// export default verifyToken;

import { Response, Request } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
interface Decoded {
  username: string;
  id: number;
  admin: boolean;
  // iat: number; // Issued at
  // exp: number; // Expires at
  // sub: string;
  // aud: string;
}
interface JwtVerifyResult {
  success: boolean;
  err?: VerifyErrors;
  data?: Decoded;
}

export const jwtVerify = (req: Request): Promise<JwtVerifyResult> => {
  const token = req.headers.authorization?.split(' ')[1];

  return new Promise((resolve) => {
    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET ?? 'secret',
        (err: VerifyErrors | null, decoded: Object | undefined) => {
          if (err) {
            resolve({ success: false, err });
          } else if (decoded) {
            resolve({ success: true, data: decoded as Decoded });
          }
          resolve({ success: false });
        },
      );
    } else {
      resolve({ success: false });
    }
  });
};

const verifyToken = (req: Request, res: Response) =>
  jwtVerify(req).then((result) =>
    result.success ? res.json(result) : res.status(401).json(result),
  );

export default verifyToken;
