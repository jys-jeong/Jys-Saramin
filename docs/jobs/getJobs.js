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
 *         example: 마인드윈
 *       - in: query
 *         name: position
 *         required: false
 *         schema:
 *           type: string
 *         description: "직무로 필터링(예: 프론트엔드, AWS, 서버개발, 백엔드 등)"
 *         example: 풀스택
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
 *         example: 3000
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
 *                 filters:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     sortby:
 *                       type: string
 *                     keyword:
 *                       type: string
 *                     company:
 *                       type: string
 *                     position:
 *                       type: string
 *                     location:
 *                       type: string
 *                     experience:
 *                       type: string
 *                     wage:
 *                       type: integer
 *                     skill:
 *                       type: string
 *                 totalCount:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 jobPostings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       companyId:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       link:
 *                         type: string
 *                       experience:
 *                         type: string
 *                       education:
 *                         type: string
 *                       employmentType:
 *                         type: string
 *                       salary:
 *                         type: integer
 *                       location:
 *                         type: string
 *                       deadline:
 *                         type: string
 *                       companyName:
 *                         type: string
 *                       wage:
 *                         type: string
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
