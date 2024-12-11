// middlewares/permissionMiddleware.js
exports.checkPermission = (role) => {
    return (req, res, next) => {
      const userRole = req.user?.role; // 사용자의 역할 (예시: 'admin', 'user')
  
      if (userRole !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      next();
    };
  };
  