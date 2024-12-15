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
 *         description: 북마크 추가 성공 / 북마크 제거 성공 
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
 *                   example: "북마크가 추가되었습니다. / 북마크가 제거되었습니다."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: "북마크 ID"
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         description: "사용자 ID"
 *                         example: 1
 *                       jobPostingId:
 *                         type: integer
 *                         description: "구인 공고 ID"
 *                         example: 123

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
 *         description: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다. / 삭제 권한이 없습니다.
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
 *                   example: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다. / 삭제 권한이 없습니다.
 *       404:
 *         description: 해당 공고가 존재하지 않습니다.
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
 *                   example: 해당 공고가 존재하지 않습니다.
 * 
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
 */