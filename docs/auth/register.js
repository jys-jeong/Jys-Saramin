/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 새로운 사용자 등록
 *     description: 사용자를 새로 등록합니다. 등록 시 이메일, 비밀번호, 이름, 역할(admin, manager, user 중 하나)을 입력해야 합니다.
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
 *                 status:
 *                   type: string
 *                   description: 성공 여부
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "회원가입 완료"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: user@example.com
 *                           email:
 *                             type: string
 *                             example: "password123"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           role:
 *                             type: string
 *                             example: "user"
 *       400:
 *         description: "잘못된 요청 (예: 유효하지 않은 이메일 형식 또는 중복된 이메일) / 이메일은 이미 사용 중입니다. / 적어도 6자 이상 입력해주세요 / 2자 이상 10자 이하로 입력해주세요 / admin, manager, user 중에 하나만 입력해주세요"
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
 *                   example: "잘못된 요청 (예: 유효하지 않은 이메일 형식 또는 중복된 이메일) / 이메일은 이미 사용 중입니다. / 적어도 6자 이상 입력해주세요 / 2자 이상 10자 이하로 입력해주세요 / admin, manager, user 중에 하나만 입력해주세요"
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
 *                   example: 서버 오류
 */
