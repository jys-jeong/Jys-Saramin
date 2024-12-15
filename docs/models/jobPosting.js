/**
 * @openapi
 * components:
 *   schemas:
 *     JobPosting:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 공고의 고유 ID
 *         companyId:
 *           type: integer
 *           description: 회사 ID (Company 모델 참조)
 *         title:
 *           type: string
 *           description: 채용 공고 제목
 *         link:
 *           type: string
 *           description: 채용 공고 링크
 *         experience:
 *           type: string
 *           description: 경력 요건
 *         education:
 *           type: string
 *           description: 학력 요건
 *         employmentType:
 *           type: string
 *           description: 고용 형태
 *         salary:
 *           type: string
 *           description: 연봉 정보
 *         location:
 *           type: string
 *           description: 근무지 위치
 *         deadline:
 *           type: string
 *           format: date
 *           description: 공고 마감일
 *         views:
 *           type: integer
 *           description: 조회수
 *       example:
 *         id: 1
 *         companyId: 101
 *         title: "백엔드 개발자 채용"
 *         link: "https://example.com/job-posting"
 *         experience: "3년 이상"
 *         education: "대학교 졸업"
 *         employmentType: "정규직"
 *         salary: "면접 후 협의"
 *         location: "서울 강남구"
 *         deadline: "2024-12-31"
 *         views: 100
 */
