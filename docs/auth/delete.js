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
 *       401:
 *         description: Authentication required
 *       403:
 *         description: 삭제 권한이 없습니다. / Invalid token
 *       404:
 *         description: 요청한 자원 없음
 *       500:
 *         description: 서버 오류 발생
 */
