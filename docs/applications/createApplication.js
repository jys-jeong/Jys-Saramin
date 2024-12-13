/**
 * @swagger
 * /applications:
 *   post:
 *     summary: 채용 공고 지원하기
 *     description: 사용자가 특정 채용 공고에 지원합니다. JWT 인증이 필요합니다.
 *     tags:
 *       - Applications
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: integer
 *                 description: 지원할 채용 공고의 ID
 *                 example: 123
 *               status:
 *                 type: string
 *                 description: 지원 상태 (기본값은 'applied')
 *                 example: applied
 *     responses:
 *       201:
 *         description: 지원 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: 생성된 지원 ID
 *                 userId:
 *                   type: integer
 *                   description: 지원자 ID
 *                 jobId:
 *                   type: integer
 *                   description: 지원한 채용 공고 ID
 *                 status:
 *                   type: string
 *                   description: 지원 상태
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: 지원 날짜
 *       400:
 *         description: 이미 지원한 상태
 *       500:
 *         description: 서버 오류
 */