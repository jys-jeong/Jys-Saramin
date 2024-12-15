/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: 채용 공고 수정
 *     description: 기존의 채용 공고를 수정합니다. 수정하려면 "admin"권한 작성자 권한이 필요합니다.(Schema의 설명을 보고 작성해주십시오) (로그인 후, accessToken을 발급 받아 입력해주세요)
 *     tags:
 *       - JobPostings
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 채용 공고의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: '채용 공고를 수정할 회사의 이름입니다. (예: 플러거, 씨맥스주식회사, 화랑 등)'
 *                 example: '플러거'
 *               title:
 *                 type: string
 *                 description: '채용 공고의 제목입니다. 예: "백엔드 개발자 모집".'
 *                 example: '프론트트 개발자 모집'
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
 *       200:
 *         description: 공고 수정 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 업데이트에 성공하였습니다.
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
 * 
 *       400:
 *         description: 회사가 존재하지 않습니다.
 *       401:
 *         description: Authentication required 
 *       403:
 *         description: Invalid token / 업데이트 권한이 없습니다.
 *       404:
 *         description: 공고가 존재하지 않습니다.
 *       500:
 *         description: 서버 오류
 */
