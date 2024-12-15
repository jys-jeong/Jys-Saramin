/**
 * @swagger
* /jobs/{id}:
 *   get:
 *     summary: 채용 공고 상세 조회
 *     description: 특정 채용 공고의 상세 정보를 조회합니다. 
 *     tags:
 *       - JobPostings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 채용 공고의 ID
 *         example: 100
 *     responses:
 *       200:
 *         description: 공고 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 job:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     experience:
 *                       type: string
 *                     education:
 *                       type: string
 *                     employmentType:
 *                       type: string
 *                     location:
 *                       type: string
 *                     deadline:
 *                       type: string
 *                     views:
 *                       type: integer
 *                     companyId:
 *                       type: integer
 *                     company:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         representative:
 *                           type: string
 *                         category:
 *                           type: string
 *                         homepage:
 *                           type: string
 *                         address:
 *                           type: string
 *                         companyType:
 *                           type: string
 *                         wage:
 *                           type: integer
 *                         employee:
 *                           type: integer
 *                     skills:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                 relatedJobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *       404:
 *         description: 공고를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */