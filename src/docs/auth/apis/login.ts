/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Login'
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Login
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                      $ref: '#/components/schemas/User'
 *                   tokens:
 *                      $ref: '#/components/schemas/Tokens'
 *
 */
