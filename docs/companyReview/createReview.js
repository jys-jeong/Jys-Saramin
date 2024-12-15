/**
 * @swagger
 * tags:
 *   name: Company Reviews
 *   description: 회사 리뷰 API
 */
/**
 * @swagger
 * /companyreview:
 *   post:
 *     summary: 회사 리뷰 생성 
 *     description: 기업 리뷰를 생성합니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags: [Company Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - review
 *             properties:
 *               companyId:
 *                 type: integer
 *                 description: 리뷰를 작성할 회사의 ID
 *                 example: 1
 *               review:
 *                 type: string
 *                 description: Content of the review
 *                 example: "이 회사는 정말 저에게 큰 도움이 되었습니다."
 *     responses:
 *       200:
 *         description: 리뷰가 성공적으로 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "리뷰가 성공적으로 등록되었습니다."
 *                 data:
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
 *                         description: 리뷰를 작성한 회사의 ID
 *                         example: 1
 *                       review:
 *                         type: string
 *                         description: 리뷰 내용용
 *                         example: "이 회사는 정말 저에게 큰 도움이 되었습니다."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: 리뷰 작성일
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: 리뷰 업데이트일
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
 *         description: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다. / 삭제 권한이 없습니다.
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
 *                   example: Invalid token / 사용자가 존재하지 않습니다. / 유효하지 않은 토큰입니다. / 삭제 권한이 없습니다.
 *       404:
 *         description: 해당 기업을 찾을 수 없습니다.
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
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: 해당 기업을 찾을 수 없습니다.
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
 *                   example: 서버 오류 발생
 */
