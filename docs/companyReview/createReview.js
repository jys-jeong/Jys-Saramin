/**
 * @swagger
 * tags:
 *   name: Company Reviews
 *   description: 회사 리뷰 API
 */
/**
 * @swagger
 * /companyreview:
 *   post:
 *     summary: Create a new company review
 *     tags: [Company Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *               - review
 *             properties:
 *               companyId:
 *                 type: integer
 *                 description: ID of the company being reviewed
 *               review:
 *                 type: string
 *                 description: Content of the review
 *     responses:
 *       201:
 *         description: Review successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created review
 *                 companyId:
 *                   type: integer
 *                   description: ID of the company being reviewed
 *                 review:
 *                   type: string
 *                   description: Content of the review
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the review was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the review was last updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
