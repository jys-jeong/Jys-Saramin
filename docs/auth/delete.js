/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: 회원 관리 API
 */

/**
 * @swagger
 * /auth/user/{id}:
 *   delete:
 *     summary: 사용자 계정 삭제
 *     description: 관리자는 다른 사용자의 계정을 삭제할 수 있으며, 자신도 계정을 삭제할 수 있습니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - Authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: '삭제할 사용자 ID (로그인 했을 때 출력된 사용자 id를 사용해도 됨)'
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 삭제 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "유저 삭제 완료"
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
 *                   example: 사용자가 존재하지 않습니다.
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
