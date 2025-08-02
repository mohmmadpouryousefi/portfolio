import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get token from multiple sources (header, cookie, query)
    let token =
      req.header("x-auth-token") ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.token ||
      req.query?.token;

    // Check if no token
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Access denied. No token provided.",
      });
    }

    // Verify JWT_SECRET exists
    const JWT_SECRET = process?.env?.JWT_SECRET || '';
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        success: false,
        msg: "Server configuration error",
      });
    }
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if token has required user data
    if (!decoded.user || !decoded.user.id) {
      return res.status(401).json({
        success: false,
        msg: "Invalid token structure",
      });
    }

    // Add user info to request object
    req.user = decoded.user;

    // Optional: Log successful authentication (remove in production)
    console.log(`User ${decoded.user.id} authenticated successfully`);

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);

    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        msg: "Token has expired",
        expired: true,
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        msg: "Invalid token format",
      });
    }

    if (err.name === "NotBeforeError") {
      return res.status(401).json({
        success: false,
        msg: "Token not active yet",
      });
    }

    // Generic error
    return res.status(401).json({
      success: false,
      msg: "Token verification failed",
    });
  }
};

// Optional: Create a role-based auth middleware
const authRole = (roles = []) => {
  return (req, res, next) => {
    auth(req, res, (err) => {
      if (err) return next(err);

      // Check if user has required role
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          msg: "Access denied. Insufficient permissions.",
        });
      }

      next();
    });
  };
};

export { auth, authRole };
