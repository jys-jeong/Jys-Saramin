/**
 * @swagger
 * /companyreview/{id}:
 *   delete:
 *     summary: 기업 리뷰 삭제
 *     description: 작성한 기업 리뷰를 삭제합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags: [Company Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 삭제할 기업 리뷰 ID를 입력합니다
 *     responses:
 *       200:
 *         description: 리뷰가 삭제되었습니다.
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Invalid token
 *       404:
 *         description: 리뷰를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */