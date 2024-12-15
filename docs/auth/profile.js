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
 *                 message:
 *                   type: string
 *                   example: "프로필 업데이트 성공"
 *                 accessToken:
 *                   type: string
 *                   example: "프로필이 새로 업데이트 되어 새 accessToken 발급"
 *       400:
 *         description: 잘못된 입력, 파라미터 오류
 *       401:
 *         description: Authentication required 
 *       403:
 *         description: Invalid token(자기 자신만 수정 가능)
 *       500:
 *         description: 서버 오류 발생
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
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "Alex"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       401:
 *         description: Authentication required 
 *       403:
 *         description: Invalid token(자기 자신만 수정 가능)
 *       404:
 *         description: 요청한 자원 없음
 *       500:
 *         description: 서버 오류 발생
 * 
 * 
 */
