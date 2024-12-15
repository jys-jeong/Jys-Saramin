/**
 * @swagger
 * /applications:
 *   post:
 *     summary: 채용 공고 지원하기
 *     description: 사용자가 특정 채용 공고에 지원합니다. JWT 인증이 필요합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
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
 *                 status:
 *                   type: string
 *                   description: 성공 여부
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   description: 메시지
 *                   example: "지원이 완료되었습니다."
 *                 data:
 *                   type: object
 *                   description: 데이터
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: 생성된 지원 ID
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       description: 지원자 ID
 *                       example: 1
 *                     jobId:
 *                       type: integer
 *                       description: 지원한 채용 공고 ID
 *                       example: 123
 *                     status:
 *                       type: string
 *                       description: 지원 상태
 *                       example: applied
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: 지원 날짜
 *       400:
 *         description: 이미 해당 공고에 지원한 상태입니다. 
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
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 이미 해당 공고에 지원한 상태입니다.
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
 *         description: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다.
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
 *                   example: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다.
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