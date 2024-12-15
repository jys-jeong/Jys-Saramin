/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: 북마크 API
 */

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     tags: [Bookmarks]
 *     summary: 북마크 추가 또는 제거
 *     description: 구인 공고 ID를 받아 북마크를 추가하거나 제거합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobPostingId:
 *                 type: integer
 *                 description: 구인 공고 ID
 *                 example: 1
 *             required:
 *               - jobPostingId
 *     responses:
 *       200:
 *         description: 북마크 제거 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "북마크가 제거되었습니다."
 *       201:
 *         description: 북마크 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "북마크 ID"
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   description: "사용자 ID"
 *                   example: 1
 *                 jobPostingId:
 *                   type: integer
 *                   description: "구인 공고 ID"
 *                   example: 123
 * 
 *       401:
 *         description: Authentication required 
 *       403:
 *         description: Invalid token 
 *       500:
 *         description: 서버 오류
 */