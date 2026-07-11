import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Protected routes ke liye token verify karna hai
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Token invalid' });
    }
  }

  // If no token provided
  return res.status(401).json({ message: 'Unauthorized: No token provided' });
};

// Role-based access control
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: Role not allowed' });
  }
  next();
};
