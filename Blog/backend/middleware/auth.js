import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: "error", message: "No token provided or invalid format" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ status: "error", message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach the entire decoded object
    next();
  });
}