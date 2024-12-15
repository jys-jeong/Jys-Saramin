/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: 사용자 프로필 업데이트
 *     description: 사용자 이메일, 이름, 비밀번호를 수정할 수 있습니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []
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
 *               name:
 *                 type: string
 *                 description: 사용자의 이름 (2자 이상, 10자 이하)
 *                 example: "Alex"
 *     responses:
 *       200:
 *         description: 프로필 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 성공 여부
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "프로필 업데이트 성공"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       accessToken:
 *                         type: string
 *                         example: "프로필이 새로 업데이트 되어 새 accessToken 발급"
 *                       refreshToken:
 *                         type: string
 *                         example: "프로필이 새로 업데이트 되어 새 refreshToken 발급"
 *       400:
 *         description: 잘못된 입력, 파라미터 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 잘못된 입력, 파라미터 오류
 *       401:
 *         description: Authentication required 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Authentication required
 *       403:
 *         description: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: 서버 오류 발생
 * 
 * /auth/user/profile:
 *   get:
 *     summary: 자신의 프로필 조회
 *     description: 인증된 사용자의 프로필 정보를 조회합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 프로필 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: 성공 여부
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: 프로필 조회 성공
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       name:
 *                         type: string
 *                         example: "Alex"
 *                       role:
 *                         type: string
 *                         example: "user"
 *       401:
 *         description: Authentication required 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Authentication required
 *       403:
 *         description: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다.
 *       404:
 *         description: 사용자가 존재하지 않습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: 사용자를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: 서버 오류 발생
 * 
 * 
 */
