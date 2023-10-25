/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh token
 *     tags: [Access]
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Refresh token
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Tokens'
 *     security:
 *      - bearerAuth: []
 *
 */
