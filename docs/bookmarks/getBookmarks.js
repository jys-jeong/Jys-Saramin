/**
 * @swagger
 * /bookmarks:
 *   get:
 *     tags: [Bookmarks]
 *     summary: 사용자의 북마크 목록 조회
 *     description: 현재 사용자의 북마크 목록을 조회합니다. 페이지네이션과 최신순 정렬이 포함됩니다. (로그인 후, accessToken을 발급 받아 입력해주세요)
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
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "유저 삭제 완료"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       totalCount:
 *                         type: integer
 *                         description: 전체 북마크 수
 *                       totalPages:
 *                         type: integer
 *                         description: 총 페이지 수
 *                       currentPage:
 *                         type: integer
 *                         description: 현재 페이지 번호
 *                       bookmarks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: 북마크 ID
 *                             jobPosting:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   description: 구인 공고 ID
 *                                   example: 1
 *                                 title:
 *                                   type: string
 *                                   description: 공고 제목
 *                                   example: "백엔드 개발자를 구합니다."
 *                                 location:
 *                                   type: string
 *                                   description: 공고 위치
 *                                   example: 서울 강남구
 *                                 salary:
 *                                   type: string
 *                                   description: 연봉 정보
 *                                   example: 3000
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
 *         description: 북마크가 존재하지 않습니다.
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
 *                   example: 북마크가 존재하지 않습니다.
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