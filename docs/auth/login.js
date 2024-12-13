/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 사용자를 인증하고, Access Token과 Refresh Token을 발급합니다.
 *     tags:
 *       - Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자의 이메일 주소 (유효한 이메일 형식이어야 함)
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호 (최소 6자 이상)
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 로그인 성공, 토큰 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: 인증 실패
 */
