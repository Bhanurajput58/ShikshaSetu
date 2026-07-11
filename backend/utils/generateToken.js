import jwt from 'jsonwebtoken';

//generate token with userId & role (valid for 1 day)
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default generateToken;
