const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Auth Error: No token provided' });

  try {
    const splitToken = token.split(' ')[1] || token; // handle 'Bearer <token>' or just '<token>'
    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET || 'supersecret_jwt_key_you_should_change');
    req.user = decoded; // { id, role }
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ message: 'Invalid Token' });
  }
};
