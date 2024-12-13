/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: 채용 공고 등록
 *     description: 새로운 채용 공고를 등록합니다. 필수 정보는 회사명, 공고 제목, 링크, 경력, 교육 등입니다.(Schema의 설명을 보고 작성해주십시오)
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
 *                 example: 'ABC Tech'
 *               title:
 *                 type: string
 *                 description: '채용 공고의 제목입니다. 예: "백엔드 개발자 모집".'
 *                 example: '백엔드 개발자 모집'
 *               link:
 *                 type: string
 *                 description: '채용 공고의 자세한 내용이 있는 링크입니다.'
 *                 example: 'https://www.abc-tech.com/jobs/backend-developer'
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
 *         description: 공고 등록 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 jobPosting:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     companyId:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     link:
 *                       type: string
 *                     experience:
 *                       type: string
 *                     education:
 *                       type: string
 *                     employmentType:
 *                       type: string
 *                     salary:
 *                       type: integer
 *                     location:
 *                       type: string
 *                     deadline:
 *                       type: string
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
