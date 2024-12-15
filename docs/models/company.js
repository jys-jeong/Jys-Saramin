/**
 * @openapi
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 회사의 고유 ID
 *         name:
 *           type: string
 *           description: 회사 이름
 *         address:
 *           type: string
 *           description: 회사 주소
 *         representative:
 *           type: string
 *           description: 대표자 이름
 *         category:
 *           type: string
 *           description: 업종
 *         homepage:
 *           type: string
 *           description: 회사 홈페이지
 *         wage:
 *           type: integer
 *           description: 평균 임금
 *         employee:
 *           type: integer
 *           description: 직원 수
 *       example:
 *         id: 101
 *         name: "플러거"
 *         address: "서울시 강남구"
 *         representative: "홍길동"
 *         category: "IT"
 *         homepage: "https://example.com"
 *         wage: 5000
 *         employee: 100
 */
