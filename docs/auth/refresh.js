/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh Token을 이용한 Access Token 발급
 *     description: 기존의 Refresh Token을 이용하여 새로운 Access Token을 발급받습니다. (로그인 했을때 발급한 refreshToken을 입력해주세요)
 *     tags:
 *       - Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "로그인 후 발급된 refreshToken"
 *     responses:
 *       200:
 *         description: 새로운 Access Token 발급
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
 *                   example: Access Token 재발급 성공.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       accessToken:
 *                         type: string
 *                         example: "새로 발급된 accessToken"
 *       400:
 *         description: 잘못된 입력, 파라미터 오류 / 
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
 *                   example: Authentication required
 *       403:
 *         description: 특정 자원에 대한 접근 권한 없음 / 특정 자원에 대한 접근 권한 없음, 로그인 해주세요
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
 *                   example: 특정 자원에 대한 접근 권한 없음 / 특정 자원에 대한 접근 권한 없음, 로그인 해주세요
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
