/**
 * @swagger
 * /companyreview:
 *   get:
 *     summary: Retrieve company reviews
 *     tags: [Company Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: integer
 *         description: Filter reviews by company ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           description: Number of reviews per page
 *     responses:
 *       200:
 *         description: List of company reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of reviews
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID of the review
 *                       companyId:
 *                         type: integer
 *                         description: ID of the company being reviewed
 *                       review:
 *                         type: string
 *                         description: Content of the review
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the review was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the review was last updated
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *       404:
 *         description: No reviews found
 *       500:
 *         description: Server error
 */
