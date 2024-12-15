/**
 * @swagger
 * tags:
 *   name: JobPostings
 *   description: 채용 공고 API
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: 채용 공고 등록
 *     description: 새로운 채용 공고를 등록합니다. 필수 정보는 회사명, 공고 제목, 링크, 경력, 교육 등입니다.(Schema의 설명을 보고 작성해주십시오)(로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - JobPostings
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: '채용 공고를 등록할 회사의 이름입니다.'
 *                 example: '플러거'
 *               title:
 *                 type: string
 *                 description: '채용 공고의 제목입니다. 예: "백엔드 개발자 모집".'
 *                 example: '백엔드 개발자 모집'
 *               link:
 *                 type: string
 *                 description: '채용 공고의 자세한 내용이 있는 링크입니다.'
 *                 example: 'https://www.example.com/jobs/backend-developer'
 *               experience:
 *                 type: string
 *                 description: '요구되는 경력 수준입니다. 예: "경력 1년", "경력 2년","경력무관","신입·경력".'
 *                 example: '경력 1년 이상'
 *               education:
 *                 type: string
 *                 description: '요구되는 학력 수준입니다. 예: "대졸 이상".'
 *                 example: '대졸 이상'
 *               employmentType:
 *                 type: string
 *                 description: '근무 형태를 정의합니다. 예: "정규직", "계약직", "프리랜서" 등.'
 *                 example: '정규직'
 *               salary:
 *                 type: integer
 *                 description: '연봉을 나타내는 숫자입니다. 예: 300 (3백만원).'
 *                 example: 3000
 *               location:
 *                 type: string
 *                 description: '근무지 위치를 나타냅니다. 예: "서울", "부산" 등.'
 *                 example: '서울'
 *               deadline:
 *                 type: string
 *                 description: '공고 마감일을 ISO 8601 형식으로 입력합니다. 예: "2024-12-31".'
 *                 example: '2024-12-31'
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: '채용 공고와 관련된 키워드 목록입니다. 예: ["백엔드", "Node.js", "개발자"].'
 *                 example: ["백엔드", "Node.js", "개발자"]
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: '필요한 기술 스킬 목록입니다. 예: ["JavaScript", "Express", "MySQL"].'
 *                 example: ["JavaScript", "Node.js", "MySQL"]
 *     responses:
 *       201:
 *         description: 공고 등록 성공
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
 *                   example: "공고 등록이 완료되었습니다."
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobPosting:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 320
 *                         companyId:
 *                           type: integer
 *                           example: 4
 *                         title:
 *                           type: string
 *                           example: "백엔드 개발자 모집"
 *                         link:
 *                           type: string
 *                           example: "https://www.example.com/jobs/backend-developer"
 *                         experience:
 *                           type: string
 *                           example: "경력 1년 이상"
 *                         education:
 *                           type: string
 *                           example: "대졸 이상"
 *                         employmentType:
 *                           type: string
 *                           example: "정규직"
 *                         salary:
 *                           type: integer
 *                           example: 3000
 *                         location:
 *                           type: string
 *                           example: "서울"
 *                         deadline:
 *                           type: string
 *                           example: "2024-12-31"
 * 
 *       400:
 *         description: 입력값 검증 실패
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
 *                   example: "모든 필드를 입력하셔야합니다. / 회사가 존재하지 않습니다."
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
