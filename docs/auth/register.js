/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 새로운 사용자 등록
 *     description: 사용자를 새로 등록합니다. 등록 시 이메일, 비밀번호, 이름, 역할을 입력해야 합니다.
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
 *               name:
 *                 type: string
 *                 description: 사용자의 이름 (2자 이상, 10자 이하)
 *                 example: "John Doe"
 *               role:
 *                 type: string
 *                 description: 사용자의 역할 (admin, manager, user 중 하나)
 *                 example: "user"
 *     responses:
 *       201:
 *         description: 회원가입 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: "잘못된 요청 (예: 유효하지 않은 이메일 형식 또는 중복된 이메일)"
 *       500:
 *         description: 서버 오류
 */
