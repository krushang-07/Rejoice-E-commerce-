const authMiddleware = require("./authMiddleware.js");

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
};

module.exports = adminMiddleware;
