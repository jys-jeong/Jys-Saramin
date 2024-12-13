/**
 * @swagger
 * /bookmarks:
 *   get:
 *     tags: [Bookmarks]
 *     summary: 사용자의 북마크 목록 조회
 *     description: 현재 사용자의 북마크 목록을 조회합니다. 페이지네이션과 최신순 정렬이 포함됩니다.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: '페이지 번호 (기본값: 1)'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: '한 페이지에 표시할 항목 수 (기본값: 5)'
 *     responses:
 *       200:
 *         description: 북마크 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: 전체 북마크 수
 *                 totalPages:
 *                   type: integer
 *                   description: 총 페이지 수
 *                 currentPage:
 *                   type: integer
 *                   description: 현재 페이지 번호
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 북마크 ID
 *                       jobPosting:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: 구인 공고 ID
 *                           title:
 *                             type: string
 *                             description: 공고 제목
 *                           location:
 *                             type: string
 *                             description: 공고 위치
 *                           salary:
 *                             type: string
 *                             description: 연봉 정보
 *       401:
 *         description: 인증 실패 (JWT 누락)
 *       500:
 *         description: 서버 오류
 */