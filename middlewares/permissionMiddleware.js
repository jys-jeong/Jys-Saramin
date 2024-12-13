// authorize.js (권한 검사 미들웨어)
module.exports = (roles = []) => {
  // 기본값은 빈 배열, 배열에 있는 역할만 접근을 허용
  return (req, res, next) => {
    const userRole = req.user.role;  // 인증된 사용자의 역할 (admin, manager 등)
    const userId = req.user.id;      // 인증된 사용자의 ID

    const userParamId = req.params.id; // URL 파라미터에서 사용자 ID를 가져옵니다.
    // 관리자 권한이거나 본인일 때만 접근 허용
    if (roles.includes(userRole) || userId === parseInt(userParamId)) {
      return next();
    }

    // 권한이 없는 경우
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  };
};
