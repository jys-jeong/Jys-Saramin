/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: 지원 취소
 *     description: 사용자가 지원을 취소합니다. JWT 인증이 필요합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - Applications
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 취소할 지원 ID
 *         example: 1
 *     responses:
 *       200:
 *         description: 지원 취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 지원이 취소되었습니다.
 *       400:
 *         description: 취소할 수 없는 상태입니다.
 *       401:
 *         description: Authentication required 
 *       403:
 *         description: Invalid token
 *       404:
 *         description: 지원 내역을 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */