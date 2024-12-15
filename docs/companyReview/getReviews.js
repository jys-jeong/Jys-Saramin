/**
 * @swagger
 * /companyreview:
 *   get:
 *     summary: 회사별 리뷰 조회
 *     description: 작성한 기업 리뷰를 조회합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags: [Company Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 조회할 회사의 ID를 입력하세요
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           description: 페이지 수를 입력하세요
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           description: 페이지당 리뷰 수
 *     responses:
 *       200:
 *         description: 회사 리뷰 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: 총 리뷰 수
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 리뷰 ID
 *                         example: 1
 *                       companyId:
 *                         type: integer
 *                         description: 작성한 리뷰의 회사의 ID
 *                         example: 1
 *                       review:
 *                         type: string
 *                         description: 리뷰 내용
 *                         example: "이 회사는 정말 저에게 큰 도움이 되었습니다."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 리뷰 작성일
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 리뷰 업데이트일
 *                 totalPages:
 *                   type: integer
 *                   description: 총 페이지 수
 *                 currentPage:
 *                   type: integer
 *                   description: 현재 페이지 수
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Invalid token
 *       404:
 *         description: 리뷰를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 */
