/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: 채용 공고 목록 조회
 *     description: 조건에 맞는 채용 공고를 목록으로 조회합니다. 페이지네이션, 필터링, 정렬 기능을 제공합니다.
 *     tags:
 *       - JobPostings
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호 (기본값 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 페이지당 공고 개수 (기본값 20)
 *       - in: query
 *         name: sortby
 *         required: false
 *         schema:
 *           type: string
 *           default: "views"
 *         description: "정렬 기준 (기본값: views): 'title', 'wage', 'deadline', 'location' 등"
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: "검색어로 채용 공고의 제목을 필터링 (예: 백엔드, 개발자, (주) 등)"
 *         example: 백엔드
 *       - in: query
 *         name: company
 *         required: false
 *         schema:
 *           type: string
 *         description: "회사명으로 필터링(예: (주)꿈선생, 화랑 등)"
 *         example: 조베이스(주)
 *       - in: query
 *         name: position
 *         required: false
 *         schema:
 *           type: string
 *         description: "직무로 필터링(예: 프론트엔드, AWS, 서버개발, 백엔드 등)"
 *         example: 백엔드
 *       - in: query
 *         name: location
 *         required: false
 *         schema:
 *           type: string
 *         description: "위치로 필터링(예: 서울, 광주, 강남구 등)"
 *         example: 서울
 *       - in: query
 *         name: experience
 *         required: false
 *         schema:
 *           type: string
 *         description: "경력으로 필터링(예: 신입, 경력, 1,2,3)"
 *         example: 경력무관
 *       - in: query
 *         name: wage
 *         required: false
 *         schema:
 *           type: integer
 *         description: "급여로 필터링 (급여(만)가 이 값 이상인 공고)"
 *         example: 0
 *       - in: query
 *         name: skill
 *         required: false
 *         schema:
 *           type: string
 *         description: "기술 스택으로 필터링(예: python, ios, c언어 등)"
 *         example: python
 *     responses:
 *       200:
 *         description: 공고 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       companyId:
 *                         type: integer
 *                         example: 6
 *                       title:
 *                         type: string
 *                         example: "[솔루션] 백엔드 개발자 모집(python)"
 *                       link:
 *                         type: string
 *                         example: https://www.saramin.co.kr/zf_user/jobs/relay/view?view_type=search&rec_idx=49555726&location=ts&searchword=python&searchType=search&paid_fl=n&search_uuid=cf6effd7-7dde-4ab8-8e5c-05b64fb54aeb
 *                       experience:
 *                         type: string
 *                         example: 경력무관
 *                       education:
 *                         type: string
 *                         example: 대졸↑
 *                       employmentType:
 *                         type: string
 *                         example: 정규직
 *                       salary:
 *                         type: integer
 *                         example: 인기있는
 *                       location:
 *                         type: string
 *                         example: 서울  강남구
 *                       deadline:
 *                         type: string
 *                         example: 2024-01-08 00:00:00
 *                       views:
 *                         type: integer
 *                         example: 2
 *                       companyName:
 *                         type: string
 *                         example: 조베이스(주)
 *                       wage:
 *                         type: string
 *                         example: 0
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *       404:
 *         description: 해당하는 데이터가 존재하지 않습니다.
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
 *                   example: "해당하는 데이터가 존재하지 않습니다."

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
 *                   example: "서버 오류가 발생했습니다."

 */
