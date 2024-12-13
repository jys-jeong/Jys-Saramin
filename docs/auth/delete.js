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
 *     description: 관리자는 다른 사용자의 계정을 삭제할 수 있으며, 자신도 계정을 삭제할 수 있습니다.
 *     tags:
 *       - Authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 사용자 ID
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 계정 삭제 성공
 *       403:
 *         description: 관리자만 또는 본인만 삭제 가능
 *       404:
 *         description: 요청한 자원 없음
 *       500:
 *         description: 서버 오류
 */
