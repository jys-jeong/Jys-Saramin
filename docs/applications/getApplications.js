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
 *     description: 사용자의 지원 내역을 조회합니다. JWT 인증이 필요합니다.
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
 *     responses:
 *       200:
 *         description: 지원 내역 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 지원 ID
 *                   userId:
 *                     type: integer
 *                     description: 지원자 ID
 *                   jobId:
 *                     type: integer
 *                     description: 채용 공고 ID
 *                   status:
 *                     type: string
 *                     description: 지원 상태
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: 지원 날짜
 *                   JobPosting:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: 채용 공고 제목
 *                       companyId:
 *                         type: integer
 *                         description: 회사 ID
 *                       location:
 *                         type: string
 *                         description: 근무지 위치
 *       500:
 *         description: 서버 오류
 */