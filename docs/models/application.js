/**
 * @openapi
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 지원서의 고유 ID
 *         userId:
 *           type: integer
 *           description: 지원자 ID (User 모델 참조)
 *         jobId:
 *           type: integer
 *           description: 채용 공고 ID (JobPosting 모델 참조)
 *         status:
 *           type: string
 *           description: 지원 상태
 *         date:
 *           type: string
 *           format: date-time
 *           description: 지원 날짜
 *       example:
 *         id: 1
 *         userId: 1
 *         jobId: 10
 *         status: "서류 접수"
 *         date: "2024-06-15T12:00:00Z"
 */
