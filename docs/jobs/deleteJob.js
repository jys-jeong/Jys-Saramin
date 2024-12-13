/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: 채용 공고 삭제
 *     description: 특정 채용 공고를 삭제합니다. 관리자나 작성자만 삭제 가능합니다.
 *     tags:
 *       - JobPostings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 채용 공고의 ID
 *         example: 123  # 삭제할 공고 ID 예시
 *     responses:
 *       200:
 *         description: 공고 삭제 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "채용 공고가 성공적으로 삭제되었습니다."
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 공고를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
