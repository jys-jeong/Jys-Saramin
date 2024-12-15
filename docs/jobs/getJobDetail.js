/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: 채용 공고 상세 조회
 *     description: 특정 채용 공고의 상세 정보를 조회하고, 조회수 증가 및 관련 공고 목록을 제공합니다.
 *     tags:
 *       - JobPostings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 채용 공고의 ID
 *         example: 100
 *     responses:
 *       200:
 *         description: 공고 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobPosting:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 6
 *                         title:
 *                           type: string
 *                           example: "[솔루션] 백엔드 개발자 모집(python)"
 *                         experience:
 *                           type: string
 *                           example: 경력무관
 *                         education:
 *                           type: string
 *                           example: 대졸↑
 *                         employmentType:
 *                           type: string
 *                           example: 정규직
 *                         location:
 *                           type: string
 *                           example: 서울  강남구
 *                         deadline:
 *                           type: string
 *                           example: 2024-01-08 00:00:00
 *                         views:
 *                           type: integer
 *                           example: 3
 *                         companyId:
 *                           type: integer
 *                           example: 6
 *                         company:
 *                           type: object
 *                           example: 
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: 조베이스(주)
 *                             representative:
 *                               type: string
 *                               example: 조배수
 *                             category:
 *                               type: string
 *                               example: 응용 소프트웨어 개발 및 공급업
 *                             homepage:
 *                               type: string
 *                               example: 정보 없음
 *                             address:
 *                               type: string
 *                               example: 서울 강남구 언주로 703, 5층 503호
 *                             companyType:
 *                               type: string
 *                               example: 정보 없음
 *                             wage:
 *                               type: integer
 *                               example: 0
 *                             employee:
 *                               type: integer
 *                               example: 5
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: 백엔드
 *                     relatedJobs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: 백엔드 개발자를 모집합니다.
 *       404:
 *         description: 공고를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 status:
 *                   type: string
 *                   example: fail
 *                 error:
 *                   type: string
 *                   example: 공고를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 */
