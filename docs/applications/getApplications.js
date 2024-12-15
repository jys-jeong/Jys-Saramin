/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: 지원 관리 API
 */

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: 지원 내역 조회
 *     description: 사용자의 지원 내역을 조회합니다. JWT 인증이 필요합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - Applications
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: '필터링할 지원 상태 (예: applied, canceled)'
 *         example: "applied"
 *     responses:
 *       200:
 *         description: 지원 내역 조회 성공
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
 *                   description: 응답 메시지
 *                   example: "지원 내역 조회 성공"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 지원 ID
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         description: 지원자 ID
 *                         example: 1
 *                       jobId:
 *                         type: integer
 *                         description: 채용 공고 ID
 *                         example: 1
 *                       status:
 *                         type: string
 *                         description: 지원 상태
 *                         example: applied
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: 지원 날짜
 *                       JobPosting:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: 채용 공고 제목
 *                             example: "백엔드 개발자 구합니다"
 *                           companyId:
 *                             type: integer
 *                             description: 회사 ID
 *                             example: 123
 *                           location:
 *                             type: string
 *                             description: 근무지 위치
 *                             example: 서울 강남구
 *       400:
 *         description: 권한 검사
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
 *                   example: 잘못된 상태 값입니다. 유효한 상태 값은 "applied" 또는 "canceled"입니다.
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