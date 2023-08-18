const jwt = require('jsonwebtoken');


// Authorization middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.substring(7);
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
 
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid
    // Store the user information in the request object for further processing
    req.user = decoded;

    next(); // Move on to the next middleware or route handler
  });
};

module.exports = authenticate;
