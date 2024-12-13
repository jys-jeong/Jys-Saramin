/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh Token을 이용한 Access Token 발급
 *     description: 기존의 Refresh Token을 이용하여 새로운 Access Token을 발급받습니다.
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
 *     responses:
 *       200:
 *         description: 새로운 Access Token 발급
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: 잘못된 입력
 *       403:
 *         description: Refresh Token이 유효하지 않음
 */
