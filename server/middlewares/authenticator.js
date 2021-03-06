// An idea from codeforgeek https://codeforgeek.com/2018/03/refresh-token-jwt-nodejs-authentication/

import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (authUser) => {
  const token = jwt.sign({ authUser }, process.env.KEYCODE);
  return token;
};

const verifyToken = (request, response, next) => {
  const token = request.headers.authorization || request.body.token || request.query.token;
  if (token === undefined) {
    return response.status(403)
      .json({
        status: 'error',
        message: 'No token supplied',
      });
  }
  jwt.verify(token, process.env.KEYCODE, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        response.status(403)
          .json({
            status: 'error',
            message: 'Invalid token supplied',
          });
      } else {
        response.status(403)
          .json({
            message: error,
          });
      }
    }
    request.authData = authData;
    return next();
  });
};

export {
  generateToken,
  verifyToken,
};
