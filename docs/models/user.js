/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 유저의 고유 ID
 *         email:
 *           type: string
 *           description: 유저의 이메일 주소
 *         password:
 *           type: string
 *           description: "유저의 암호 (Base64로 암호화)"
 *         name:
 *           type: string
 *           description: 유저의 이름
 *         role:
 *           type: string
 *           enum: [user, admin, manager]
 *           description: "유저의 역할 (기본값: user)"
 *       example:
 *         id: 1
 *         email: "user@example.com"
 *         password: "encrypted_password"
 *         name: "홍길동"
 *         role: "user"
 */
